# Generated by Django 4.2.4 on 2023-10-04 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0012_customuser_profileimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profileImage',
            field=models.ImageField(blank=True, null=True, upload_to='profile_images'),
        ),
    ]
