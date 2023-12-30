# Generated by Django 4.2.4 on 2023-12-07 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('PurchaseHistory', '0011_dailysales'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategorySales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=255)),
                ('sales', models.PositiveIntegerField(default=0)),
                ('seller_history', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='PurchaseHistory.sellerorderhistory')),
            ],
        ),
    ]