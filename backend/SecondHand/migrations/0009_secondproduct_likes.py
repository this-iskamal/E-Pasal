# Generated by Django 4.2.4 on 2023-12-12 02:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SecondHand', '0008_secondproduct_seller'),
    ]

    operations = [
        migrations.AddField(
            model_name='secondproduct',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_products', to=settings.AUTH_USER_MODEL),
        ),
    ]
