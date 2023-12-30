# models.py

from django.db import models
from Account.models import CustomUser


class SecondProduct(models.Model):
    productName = models.CharField(max_length=255)
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    category = models.CharField(max_length=255)
    originalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    ratedPrice = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    contactInfo = models.CharField(max_length=255)
    warranty = models.CharField(max_length=255, blank=True, null=True)
    guarantee = models.CharField(max_length=255, blank=True, null=True)
    likes = models.ManyToManyField(CustomUser, related_name='liked_products', blank=True)
   
    def __str__(self):
        return self.productName


class SecondProductImage(models.Model):
    product = models.ForeignKey(SecondProduct, on_delete=models.CASCADE, related_name='secondproductimage_set')
    image = models.ImageField(upload_to='second_product_photos')

    def __str__(self):
        return self.product.productName
