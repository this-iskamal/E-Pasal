from django.urls import path
from .views import ProductCreateAPIView,ProductListView

urlpatterns = [
    # ... other URL patterns
    path('api/products/create', ProductCreateAPIView.as_view(), name='product-create'),
    path('api/products/view', ProductListView.as_view(), name='product-create'),

]
