# Generated by Django 3.0.6 on 2020-05-31 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='espace',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=20)),
                ('nom', models.CharField(max_length=20)),
                ('type', models.CharField(max_length=20)),
                ('documentsModule', models.BooleanField(default=False)),
                ('documentsModuleActivation', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='plan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payant', models.BooleanField(default=False)),
                ('pack', models.IntegerField()),
                ('max_entities', models.IntegerField()),
                ('max_stockage', models.IntegerField()),
                ('debut_periode', models.DateTimeField(blank=True)),
                ('fin_periode', models.DateTimeField(blank=True)),
            ],
        ),
    ]
