# Generated by Django 4.2.4 on 2023-11-20 09:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0015_seller_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller',
            name='user',
        ),
    ]
