from rest_framework import serializers
from .models import ProductImage,Product

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image',)  # Include the 'id' field for reference and the 'image' field

class ProductSerializer(serializers.ModelSerializer):
    image = ProductImageSerializer(many=True, read_only=True, source='productimage_set')  # Use the reverse relation 'productimage_set'

    class Meta:
        model = Product
        fields = '__all__'
