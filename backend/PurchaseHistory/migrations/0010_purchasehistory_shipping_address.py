# Generated by Django 4.2.4 on 2023-12-05 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PurchaseHistory', '0009_sellerorderhistory_customers_emails'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchasehistory',
            name='shipping_address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
