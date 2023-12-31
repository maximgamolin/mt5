# Generated by Django 4.2.6 on 2023-10-14 06:30

import django.contrib.gis.db.models.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ATM',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField()),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('all_day', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='ATMService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity', models.CharField(choices=[('UNAVAILABLE', 'Unavailable'), ('UNKNOWN', 'Unknown'), ('AVAILABLE', 'Available')], max_length=11)),
                ('capability', models.CharField(choices=[('UNSUPPORTED', 'Unsupported'), ('UNKNOWN', 'Unknown'), ('SUPPORTED', 'Supported')], max_length=11)),
                ('atm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='atm.atm')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='atm.service')),
            ],
        ),
    ]
