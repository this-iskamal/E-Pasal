from django.urls import path
from .views import UserRegistrations , UserLogin , UserProfile , SellerRegistration,store_address,Sellers,delete_selller,update_seller,SellerProfile


urlpatterns = [
    path("register",UserRegistrations.as_view(),name='user-registration'),
    path("seller/register",SellerRegistration.as_view(),name='seller-registration'),

    path("login",UserLogin.as_view(),name='user-login'),
    path("profile",UserProfile.as_view(),name='user-login'),
    path("seller/profile",SellerProfile.as_view(),name='seller-profile'),
    path("address",store_address,name='store-address'),
    path("getSellers",Sellers.as_view(),name='get-sellers'),
    path("deleteSeller",delete_selller,name='delete-seller'),
    path("updateSeller",update_seller,name='update-seller'),
]   