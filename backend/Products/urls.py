from django.urls import path
from .views import ProductCreateAPIView,ProductListView,ProductDetailView,SellerProductsView

urlpatterns = [
    # ... other URL patterns
    path('api/products/create', ProductCreateAPIView.as_view(), name='product-create'),
    path('api/products/view', ProductListView.as_view(), name='product-create'),
    path('api/products/<str:product_name>/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/products/getsellerproducts/<str:id>/',SellerProductsView.as_view(),name="seller-products"),

]

