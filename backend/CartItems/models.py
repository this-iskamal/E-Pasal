# models.py

from django.db import models
from Account.models import CustomUser
from Products.models import Product

class CartItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product , on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    # Add other fields as needed (e.g., quantity, price, etc.)

    def __str__(self):
        return f"{self.user} - {self.product_id}"
