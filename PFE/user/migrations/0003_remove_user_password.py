# Generated by Django 3.0.6 on 2020-05-27 07:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='password',
        ),
    ]