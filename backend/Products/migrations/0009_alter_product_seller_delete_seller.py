# Generated by Django 4.2.4 on 2023-10-05 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0008_rename_brand_name_product_brandname_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='seller',
            field=models.EmailField(max_length=200),
        ),
        migrations.DeleteModel(
            name='Seller',
        ),
    ]
