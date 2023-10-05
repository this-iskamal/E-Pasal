from django.urls import path
from .views import UserRegistrations , UserLogin , UserProfile


urlpatterns = [
    path("register",UserRegistrations.as_view(),name='user-registration'),
    path("login",UserLogin.as_view(),name='user-login'),
    path("profile",UserProfile.as_view(),name='user-login'),
]