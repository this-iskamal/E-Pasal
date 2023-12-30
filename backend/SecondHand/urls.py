# urls.py

from django.urls import path
from .views import ProductUploadView,SecondProductListView, LikeProductView,SecondProductDetailView

urlpatterns = [
    path('upload/', ProductUploadView.as_view(), name='product-upload'),
    path('second-products/', SecondProductListView.as_view(), name='second-product-list'),
    path('second-products/<int:pk>/', SecondProductDetailView.as_view(), name='second-product-detail'),
    path('api/like/<int:product_id>/', LikeProductView.as_view(), name='like_product_api'),
    # Add other URLs as needed
]
