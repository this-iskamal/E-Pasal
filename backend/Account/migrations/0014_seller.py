# Generated by Django 4.2.4 on 2023-11-20 05:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0013_alter_customuser_profileimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('sellerCertificate', models.ImageField(blank=True, null=True, upload_to='seller_certificates')),
            ],
            options={
                'abstract': False,
            },
            bases=('Account.customuser',),
        ),
    ]
