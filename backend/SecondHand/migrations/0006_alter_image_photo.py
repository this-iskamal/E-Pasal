# Generated by Django 4.2.4 on 2023-12-10 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SecondHand', '0005_remove_image_product_secondproduct_images_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='second_product_photos/'),
        ),
    ]
