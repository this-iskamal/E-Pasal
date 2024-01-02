from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes,api_view
from .models import CustomUser,Address,Seller,PasswordResetToken
from .serializers import UserSerializer, UserProfileSerializer , SellerSerializer,AddressSerializer,SellerProfileSerializer
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate,login
from django.core.mail import send_mail
import json
from django.shortcuts import get_object_or_404
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
import secrets

class UserRegistrations(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("register attempt")
        
      
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Successfully registered",
                    "success": True,
                    "user": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": serializer.errors, "success": False},
            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
        )


class SellerRegistration(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("seller registration attempt")
        
        
        serializer = SellerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Successfully registered as a seller",
                    "success": True,
                    "seller": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": serializer.errors, "success": False},
            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
        )
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def store_address(request):
    address_data = request.data.get('addresss')  # Change 'addresss' to 'address'

    user = request.user

    # Assuming you have an Address model
    try:
        address_instance = Address.objects.get(user=user)
        address_serializer = AddressSerializer(address_instance, data=request.data)
    except Address.DoesNotExist:
        address_serializer = AddressSerializer(data=request.data)

    if address_serializer.is_valid():
        address_serializer.save(user=user)
        return Response({'message': 'Address saved successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': f'{address_serializer.errors}'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        
        email = request.data.get("email").lower()
        password = request.data.get("password")

        print(email,password)
        user = authenticate(request, username=email, password=password)
        print("login attempt")
        if user is not None:
            refresh = RefreshToken.for_user(user)
            role = "regular" 
            if user.is_staff:
                if user.seller_status:
                    role = "seller" 
            if user.is_superuser:
                role="superuser"


            return Response(
                {
                    "message": "Successfully logged in",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "success": True,
                    "role": role,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "Authentication Failed", "success": False},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )

    


class UserProfile(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
       
        serializer = UserProfileSerializer(self.request.user)
        user_data = serializer.data

        return Response(
            {"message": "success", "success": True, "user": user_data},
            status=status.HTTP_200_OK,
        )
    
class SellerProfile(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
       
        serializer = SellerProfileSerializer(self.request.user)
        user_data = serializer.data

        return Response(
            {"message": "success", "success": True, "user": user_data},
            status=status.HTTP_200_OK,
        )
    

class Sellers(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = CustomUser.objects.get(id=request.user.id)
        print(user)
        if user.is_superuser:
            sellers = Seller.objects.filter(is_staff=True,is_superuser=False)
            serializer = SellerProfileSerializer(sellers, many=True)
            return Response(
                {"message": "success", "success": True, "sellers": serializer.data},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "You are not authorized", "success": False},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )
        
@api_view(['delete'])
@permission_classes([IsAuthenticated])
def delete_selller(request):
    print(request.data)
    user = CustomUser.objects.get(id=request.user.id)
    if user.is_superuser:
        seller_id = request.data.get("sellerId")
     
        seller = Seller.objects.get(id=seller_id)
        seller.delete()
        return Response(
            {"message": "Seller deleted successfully", "success": True},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"message": "You are not authorized", "success": False},
            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
        )
    
@api_view(['put'])
@permission_classes([IsAuthenticated])
def update_seller(request):
    print(request.data.get("sellerId"))
    user = CustomUser.objects.get(id=request.user.id)
    if user.is_superuser:
        seller_id = request.data.get("sellerId")
        seller = Seller.objects.get(id=seller_id)
        seller.seller_status = True
        seller.save()
        return Response(
            {"message": "Seller updated successfully", "success": True},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"message": "You are not authorized", "success": False},
            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
        )
    

class ForgotPasswordView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a unique token with user ID
        token = f"{secrets.token_urlsafe(30)}-{user.id}"

        # Save the token in the database
        reset_token = PasswordResetToken.objects.create(user=user, token=token)

        # Create the reset link
        reset_link = f"{settings.FRONTEND_URL}/reset-password/{token}/"

        # Subject and from_email
        subject = 'Reset Your Password - E-pasal'
        from_email = settings.DEFAULT_FROM_EMAIL

        # Email content
        context = {'reset_link': reset_link, 'site_name': 'E-pasal'}
        html_content = render_to_string('Account/password_reset_email.html', context)
        text_content = f"Click the following link to reset your password:\n\n{reset_link}"

        # Create the email message
        msg = EmailMultiAlternatives(subject, text_content, from_email, [email])
        msg.attach_alternative(html_content, "text/html")

        # Send the email
        msg.send()

        return Response({'message': 'Password reset link has been sent to your email.'}, status=status.HTTP_200_OK)
    


class ValidateResetTokenView(APIView):
    
    def get(self, request, token):
        # Check if the token is valid
        user = get_object_or_404(CustomUser, passwordresettoken__token=token)
        return Response({'isValid': True}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
    def post(self, request, token):
        # Check if the token is valid
        user = get_object_or_404(CustomUser, passwordresettoken__token=token)

        # Get new password from request data
        new_password = request.data.get('password')
        confirm_password = request.data.get('confirmPassword')

        # Perform password validation if needed
        if new_password != confirm_password:
            return Response({'message': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the user's password
        user.set_password(new_password)
        user.save()

        # Optional: Remove the used password reset token
        user.passwordresettoken_set.all().delete()

        return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
    
    
