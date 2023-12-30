from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Message
from Account.models import CustomUser as User
from .serializers import MessageSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.db.models import Q

class MessageListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        other_user = get_object_or_404(User, email=username)

        # Retrieve messages between the authenticated user and the other user
        messages = Message.objects.filter(
            (Q(sender=request.user, receiver=other_user) | Q(sender=other_user, receiver=request.user))
        ).order_by('timestamp')

        serializer = MessageSerializer(messages, many=True)
        return Response({'messages': serializer.data})



class MessageCreateView(APIView):
    permission_classes=[IsAuthenticated]    
    def post(self, request, username):
        
        other_user = get_object_or_404(User, email=username)
        content = request.data.get('content', '')
        message = Message.objects.create(sender=request.user, receiver=other_user, content=content)
        serializer = MessageSerializer(message)
        return Response({'status': 'ok', 'message': serializer.data}, status=status.HTTP_201_CREATED)
    


class GetUserContact(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        user = User.objects.get(email=username)

        # Retrieve contacts where the user is either the sender or receiver
        contacts = Message.objects.filter(Q(sender=user) | Q(receiver=user)).values('sender', 'receiver').distinct()

        # Extract unique user IDs from contacts
        user_ids = set()
        for contact in contacts:
            user_ids.add(contact['sender'])
            user_ids.add(contact['receiver'])

        # Exclude the user's own ID
        user_ids.discard(user.id)

        # Retrieve user objects for the contact IDs
        contact_users = User.objects.filter(id__in=user_ids)

        # Serialize the contact users or extract the necessary information
        # based on your requirements

        # Example serialization
        serialized_contacts = [{'username':user.fullName, 'email': user.email} for user in contact_users]

        return Response({'contacts': serialized_contacts}, status=status.HTTP_200_OK)
        
