# Generated by Django 4.2.4 on 2023-10-05 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0012_remove_product_image_productimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='product_images'),
        ),
        migrations.DeleteModel(
            name='ProductImage',
        ),
    ]
