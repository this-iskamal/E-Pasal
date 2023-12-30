from django.urls import path
from .views import ProductCreateAPIView,ProductListView,ProductDetailView,SellerProductsView,ProductSearchView,SimilarProductsView,RecommendProductsView,get_products_by_category

urlpatterns = [
    path('api/products/create', ProductCreateAPIView.as_view(), name='product-create'),
    path('api/products/view', ProductListView.as_view(), name='product-create'),
    path('api/products/<str:product_name>/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/products/getsellerproducts/<str:id>/',SellerProductsView.as_view(),name="seller-products"),
    path('api/products/search/', ProductSearchView.as_view(), name='product-search'),
    path('api/products/<int:productId>/similar/', SimilarProductsView.as_view(), name='product-similar'),
    path('api/products/recommended/', RecommendProductsView.as_view(), name='product-recommended'),
    path('api/products/<str:category>/',get_products_by_category,name="get-products-by-category")

]

