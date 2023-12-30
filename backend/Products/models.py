from django.db import models
from Account.models import CustomUser


class Product(models.Model):
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True)
    product_name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    sold = models.PositiveIntegerField(default=0)
    isFlashSale = models.BooleanField(default=False)
    freeDelivery = models.BooleanField(default=False)
    isNewArrival = models.BooleanField(default=False)
    discountRate = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    @property
    def discount_percent(self):
        if self.price and self.discountRate:
            return (self.discountRate / self.price) * 100
        return 0
    
    
    
    tags = models.JSONField(
        null=True, blank=True
    ) 
    brandName = models.CharField(max_length=255, null=True, blank=True)
    colors = models.JSONField(
        null=True, blank=True
    ) 
    size = models.CharField(max_length=255, null=True, blank=True)
    stocks = models.PositiveIntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Set isFlashSale to True if discount_percent is more than 30
        if self.discount_percent > 30:
            self.isFlashSale = True
        else:
            self.isFlashSale = False

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product_name} - {self.id}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='productimage_set')
    image = models.ImageField(upload_to='product_images')

    def __str__(self):
        return self.product.product_name
    

class ProductDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_details')
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    


class SearchHistoryModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    query = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

