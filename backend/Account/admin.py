from django.contrib import admin
from .models import CustomUser , Seller,Address


admin.site.register(CustomUser)
admin.site.register(Seller)
admin.site.register(Address)

