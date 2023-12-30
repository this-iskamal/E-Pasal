from rest_framework import serializers
from .models import PurchaseHistory,SellerorderHistory,DailySales,CategorySales
from Products.models import Product
from Account.models import CustomUser




class DailySalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySales
        fields = ['date', 'number_of_sales']

class CategorySalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategorySales
        fields = ['category', 'sales']

class SellerorderHistorySerializer(serializers.ModelSerializer):
    daily_sales = DailySalesSerializer(many=True, read_only=True)
    category_sales = CategorySalesSerializer(many=True, read_only=True)  # Add this line

    class Meta:
        model = SellerorderHistory
        fields = ['id', 'seller', 'total_products', 'customers_emails', 'total_revenue', 'total_customers', 'total_orders', 'daily_sales', 'category_sales']


class PurchaseHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseHistory
        fields = ['id', 'user', 'product','status', 'quantity', 'total_cost', 'purchase_date','shipping_address']


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'fullName']




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name', 'category']  # Add 'category' here


class PurchaseHistorySerializer1(serializers.ModelSerializer):
    user = CustomUserSerializer()  # Use the CustomUserSerializer to serialize the user field
    product = ProductSerializer()  # Use the ProductSerializer to serialize the Product field

    class Meta:
        model = PurchaseHistory
        fields = ['id', 'user', 'product', 'quantity','status', 'total_cost', 'purchase_date','shipping_address']


