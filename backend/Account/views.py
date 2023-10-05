from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from .models import CustomUser
from .serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate,login


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


class UserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.POST.get("email").lower()
        password = request.POST.get("password")

      
        user = authenticate(request, username=email, password=password)
        print("login attempt")
        if user is not None:
            refresh = RefreshToken.for_user(user)
            role = "regular" 
            if user.is_staff:
                role = "seller"  


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