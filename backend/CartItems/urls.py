# urls.py

from django.urls import path
from .views import add_to_cart, get_cart

urlpatterns = [
    path('add-to-cart/', add_to_cart, name='add_to_cart'),
    path('get-cart/', get_cart, name='get_cart'),
    # Add other URLs as needed
]
