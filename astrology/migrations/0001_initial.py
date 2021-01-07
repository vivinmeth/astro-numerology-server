# Generated by Django 3.1.5 on 2021-01-07 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PlanetZodiacMap',
            fields=[
                ('ID', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Deg', models.IntegerField()),
                ('M1', models.IntegerField()),
                ('S1', models.IntegerField()),
                ('DecimalDeg', models.FloatField()),
                ('RA', models.CharField(max_length=11)),
                ('NA', models.CharField(max_length=11)),
                ('UA', models.CharField(max_length=11)),
                ('R', models.CharField(max_length=11)),
                ('N', models.CharField(max_length=11)),
            ],
        ),
    ]