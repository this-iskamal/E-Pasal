# Generated by Django 4.2.4 on 2023-11-19 05:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CartItems', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='product_name',
        ),
        migrations.AddField(
            model_name='cartitem',
            name='product_id',
            field=models.IntegerField(default=0),
        ),
    ]
