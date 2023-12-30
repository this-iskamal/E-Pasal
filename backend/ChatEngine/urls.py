from django.urls import path
from .views import MessageListView, MessageCreateView,GetUserContact

urlpatterns = [
    path('messages/<str:username>/', MessageListView.as_view(), name='message_list'),
    path('<str:username>/send/', MessageCreateView.as_view(), name='send_message'),
    path('get-user-contact/<str:username>/', GetUserContact.as_view(), name='get_user_contact'),
]
