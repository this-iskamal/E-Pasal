from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer,ReviewSerializer1
from rest_framework.permissions import IsAuthenticated, AllowAny

class ReviewView(APIView):

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        elif self.request.method == 'POST':
            return [IsAuthenticated()]
        else:
            # Handle other HTTP methods as needed
            return [IsAuthenticated()]

    def get(self, request, productId):
        reviews = Review.objects.filter(product_id=productId)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request, productId):
        user = request.user
        request.data['user'] = user.id
        request.data['product'] = productId

        serializer = ReviewSerializer1(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, productId):
        user = request.user
        review = Review.objects.get(id=productId)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
