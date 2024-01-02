# from rest_framework import serializers
# from .models import CustomUser
# from django.contrib.auth.hashers import make_password




# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields= ['id','fullName','email','phoneNumber','password','profileImage','is_staff']
#         extra_kwargs = {"password":{"write_only":True}}

#     def create(self, validated_data):
    
#         password = validated_data.get('password')
#         hashed_password = make_password(password)
#         validated_data['password'] = hashed_password

#         user = CustomUser.objects.create(**validated_data)
#         return user


# class UserProfileSerializer (serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id','email','fullName','phoneNumber','is_staff','profileImage']




from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser, Seller,Address,PasswordResetToken

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'addresss']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'fullName', 'email', 'phoneNumber', 'password', 'profileImage', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.get('password')
        hashed_password = make_password(password)
        validated_data['password'] = hashed_password

        user = CustomUser.objects.create(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    addresss = AddressSerializer(many=True, read_only=True, source='address_set')
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'fullName', 'phoneNumber', 'is_staff', 'profileImage','addresss']

class SellerProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Seller
        fields = ['id', 'email', 'fullName', 'phoneNumber', 'is_staff','pan', 'profileImage','seller_status','sellerCertificate']

class SellerSerializer(UserSerializer):
  
    # Additional fields specific to sellers
    sellerCertificate = serializers.ImageField(required=False, allow_null=True)
    pan = serializers.CharField(required=False, allow_null=True)

    def create(self, validated_data):
        password = validated_data.get('password', None)
        hashed_password = make_password(password)
        validated_data['password'] = hashed_password

        seller = Seller.objects.create(**validated_data)
        return seller

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['sellerCertificate','pan']
        extra_kwargs = {'password': {'write_only': True}}

class PasswordResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ['token']


