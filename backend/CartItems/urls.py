# urls.py

from django.urls import path
from .views import add_to_cart, get_cart,delete_cart,update_cart

urlpatterns = [
    path('add-to-cart/', add_to_cart, name='add_to_cart'),
    path('get-cart/', get_cart, name='get_cart'),
    path('delete-cart/<int:id>/', delete_cart, name='delete_cart_item'),
    path('update-cart/<int:id>/',update_cart,name='update_cart_item')
    # Add other URLs as needed
]
