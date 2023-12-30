from django.db import models
from Account.models import CustomUser
from Products.models import Product



class PurchaseHistory(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='pending')
    quantity = models.PositiveIntegerField(default=1)
    shipping_address = models.CharField(max_length=255, blank=True, null=True)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.email} - {self.product.product_name} - {self.purchase_date}"
    

class SellerorderHistory(models.Model):
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    total_customers = models.PositiveIntegerField(default=0)
    total_orders = models.PositiveIntegerField(default=0)
    total_products = models.PositiveIntegerField(default=0)
    customers_emails = models.JSONField(default=list)

    def __str__(self):
        return f"{self.seller.email}"

    def save(self, *args, **kwargs):
        self.total_products = Product.objects.filter(seller=self.seller).count()
        super().save(*args, **kwargs)


class DailySalesManager(models.Manager):
    def get_sorted_daily_sales(self, seller_history):
        return self.filter(seller_history=seller_history).order_by('date')

class DailySales(models.Model):
    seller_history = models.ForeignKey(SellerorderHistory, on_delete=models.CASCADE)
    date = models.DateField()
    number_of_sales = models.PositiveIntegerField(default=0)

    objects = DailySalesManager()

    def __str__(self):
        return f"Daily Sales for {self.date} - Seller: {self.seller_history.seller.email}"
    
class CategorySalesManager(models.Manager):
    def get_sorted_category_sales(self, seller_history):
        return self.filter(seller_history=seller_history).order_by('category')

class CategorySales(models.Model):
    seller_history = models.ForeignKey(SellerorderHistory, on_delete=models.CASCADE)
    category = models.CharField(max_length=255)
    sales = models.PositiveIntegerField(default=0)

    objects = CategorySalesManager()

    def __str__(self):
        return f"Category Sales for {self.category} - Seller: {self.seller_history.seller.email}"
    


    



