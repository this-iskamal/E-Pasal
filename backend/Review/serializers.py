
from rest_framework import serializers
from .models import Review
from Account.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'fullName', 'profileImage',)

class ReviewSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'


class ReviewSerializer1(serializers.ModelSerializer):
   
    class Meta:
        model = Review
        fields = '__all__'
