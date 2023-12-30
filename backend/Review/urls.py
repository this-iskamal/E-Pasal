from django.urls import path
from .views import ReviewView

urlpatterns = [
    path('api/reviews/<int:productId>/', ReviewView.as_view(), name='reviews-list'),
]
