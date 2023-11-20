# views.py

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CartItem
from .serializers import CartItemSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_name = request.data.get('selectedProduct')
    print(product_name)
    # Check if the item is already in the cart
    if CartItem.objects.filter(user=user, product_id=product_name).exists():
        return Response({"detail": "Item already in the cart","success":False}, status=status.HTTP_200_OK)

    # Add the item to the cart
    cart_item = CartItem(user=user, product_id=product_name)
    cart_item.save()

    return Response({"detail": "Item added to the cart"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)
