# Generated by Django 4.2.4 on 2023-09-27 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0006_alter_customuser_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(max_length=128, verbose_name='password'),
        ),
    ]
