from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, ProductImage
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated


class ProductCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_serializer = ProductSerializer(data=request.data)

        if product_serializer.is_valid():
            product_instance = product_serializer.save()  # Save the product data

            # Handle product images
            images_data = [
                request.FILES[key] for key in request.FILES if key.startswith("image")
            ]

            for image_data in images_data:
                ProductImage.objects.create(product=product_instance, image=image_data)

            return Response({'message':"successfully created",'data':product_serializer.data,'success':True}, status=status.HTTP_201_CREATED)
        return Response({'message':product_serializer.errors,'success':False}, status=status.HTTP_400_BAD_REQUEST)


class ProductListView(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class ProductDetailView(APIView):

    def get_product(self,id):
        print(f"Product ID received: {id}")
        try:
            return Product.objects.get(id=id)
           
        except Product.DoesNotExist:
            return None

    def get(self, request, product_name, id):
        try:
            product = Product.objects.get(id=id, product_name=product_name)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request,product_name ,id):
        print(f"Attempting to delete product with ID: {id}")

        product =self.get_product(id)
        if product:
            product_images = ProductImage.objects.filter(product=product)
            for product_image in product_images:
                product_image.image.delete()
                product_image.delete()
            product.delete()
            return Response({"message":"product deleted"},status=status.HTTP_200_OK)
        else:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        

    


class SellerProductsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id,format=None):
        
        try:
            print(id)
            product = Product.objects.filter(seller=id)
            serializer = ProductSerializer(product , many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        
