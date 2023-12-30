from django.contrib import admin
from .models import PurchaseHistory,SellerorderHistory,DailySales,CategorySales

# Register your models here.
admin.site.register(PurchaseHistory)
admin.site.register(SellerorderHistory)
admin.site.register(DailySales)
admin.site.register(CategorySales)

