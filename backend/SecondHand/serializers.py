# serializers.py

from rest_framework import serializers
from .models import SecondProduct, SecondProductImage
from Account.models import CustomUser

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model =SecondProductImage
        fields = ('id', 'image')

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'fullName', 'email','phoneNumber','profileImage')

class SecondProductSerializer1(serializers.ModelSerializer):
    image = ImageSerializer(many=True, read_only=True, source='secondproductimage_set')
    seller = SellerSerializer(read_only=True)

    class Meta:
        model = SecondProduct
        fields = ('id', 'productName', 'category', 'originalPrice', 'ratedPrice','likes', 'location', 'contactInfo', 'warranty', 'guarantee','image','seller')


class SecondProductSerializer(serializers.ModelSerializer):
    image = ImageSerializer(many=True, read_only=True, source='secondproductimage_set')

    class Meta:
        model = SecondProduct
        fields = ('id', 'productName', 'category', 'originalPrice', 'ratedPrice','likes', 'location', 'contactInfo', 'warranty', 'guarantee','image','seller')

    