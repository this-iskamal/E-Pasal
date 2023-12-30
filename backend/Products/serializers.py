from rest_framework import serializers
from .models import ProductImage,Product,ProductDetail

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image',)  # Include the 'id' field for reference and the 'image' field


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ['id','name', 'value']

class ProductSerializer(serializers.ModelSerializer):
    image = ProductImageSerializer(many=True, read_only=True, source='productimage_set')  # Use the reverse relation 'productimage_set'
    discount_percent = serializers.SerializerMethodField()
    product_details = ProductDetailSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'description', 'price', 'category', 'sold',
                  'isFlashSale', 'freeDelivery', 'isNewArrival', 'discountRate',
                  'tags', 'brandName', 'colors', 'size', 'stocks', 'created_at',
                  'product_details','discount_percent','image','seller']
 

    def get_discount_percent(self, obj):
        return round(obj.discount_percent,2)
    

