# Generated by Django 4.2.4 on 2023-10-05 04:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0015_alter_productimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productimage_set', to='Products.product'),
        ),
    ]