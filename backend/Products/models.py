from django.db import models
from Account.models import CustomUser


class Product(models.Model):
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True)
    product_name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    

    discountRate = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    tags = models.JSONField(
        null=True, blank=True
    )  # JSONField for storing a list of tags
    brandName = models.CharField(max_length=255, null=True, blank=True)
    colors = models.JSONField(
        null=True, blank=True
    )  # JSONField for storing a list of colors
    size = models.CharField(max_length=255, null=True, blank=True)
    stocks = models.PositiveIntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='productimage_set')
    image = models.ImageField(upload_to='product_images')

    def __str__(self):
        return self.product.product_name

