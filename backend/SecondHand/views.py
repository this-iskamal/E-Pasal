from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import SecondProduct, SecondProductImage
from django.shortcuts import get_object_or_404
from .serializers import SecondProductSerializer,SecondProductSerializer1

class ProductUploadView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        seller = request.user
        request.data['seller'] = seller.id  
        second_product_serializer = SecondProductSerializer(data=request.data)
        
        if second_product_serializer.is_valid():
            # Save the product without images
            second_product_instance = second_product_serializer.save()


            images_data = [
                request.FILES[key] for key in request.FILES if key.startswith('photo')
            ]
            # Create Image instances and associate them with the product
            for image_data in images_data:
                SecondProductImage.objects.create(product=second_product_instance, image=image_data)

            return Response(second_product_serializer.data, status=status.HTTP_201_CREATED)
        return Response(second_product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class SecondProductListView(APIView):
    def get(self, request, format=None):
        second_products = SecondProduct.objects.all()
        serializer = SecondProductSerializer(second_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SecondProductDetailView(APIView):
    def get(self, request, pk, format=None):
        second_product = get_object_or_404(SecondProduct, pk=pk)
        serializer = SecondProductSerializer1(second_product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk, format=None):
        second_product = get_object_or_404(SecondProduct, pk=pk)
    
        second_product.delete()

        return Response({"detail": "Product marked as sold and deleted successfully."}, status=status.HTTP_200_OK)



class LikeProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        # Get the product
        product = get_object_or_404(SecondProduct, id=product_id)

        # Check if the user has already liked the product
        if request.user in product.likes.all():
            # If the user has already liked the product, unlike it
            product.likes.remove(request.user)
            liked = False
        else:
            # If the user hasn't liked the product, like it
            product.likes.add(request.user)
            liked = True

        # You can return any additional data you need
        return Response({'liked': liked, 'like_count': product.likes.count()}, status=status.HTTP_200_OK)