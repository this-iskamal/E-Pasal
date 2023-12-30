from django.urls import path
from .views import PurchaseHistoryListView, PurchaseHistoryDetailView, CreatePurchaseHistoryView,ConfirmOrderView,SellerOrderHistory,SellerDashboardView

urlpatterns = [
    path('api/purchase-history/', PurchaseHistoryListView.as_view(), name='purchase-history-list'),
    path('api/purchase-history/create/', CreatePurchaseHistoryView.as_view(), name='create-purchase-history'),
    path('api/purchase-history/<int:pk>/', PurchaseHistoryDetailView.as_view(), name='purchase-history-detail'),
    path('api/confirm-order/<int:pk>/', ConfirmOrderView.as_view(), name='confirm-order'),
    path('api/seller-order-history/', SellerOrderHistory.as_view(), name='seller-order-history'),
    path('api/seller-dashboard/', SellerDashboardView.as_view(), name='seller-dashboard'),
]
