# Generated by Django 4.2.4 on 2023-12-02 04:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0021_product_isflashsale_product_isnewarrival'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='freeDelivery',
            field=models.BooleanField(default=False),
        ),
    ]
