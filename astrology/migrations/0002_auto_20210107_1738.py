# Generated by Django 3.1.5 on 2021-01-07 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('astrology', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='planetzodiacmap',
            old_name='ID',
            new_name='id',
        ),
        migrations.AlterField(
            model_name='planetzodiacmap',
            name='N',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='planetzodiacmap',
            name='NA',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='planetzodiacmap',
            name='R',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='planetzodiacmap',
            name='RA',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='planetzodiacmap',
            name='UA',
            field=models.CharField(max_length=250),
        ),
    ]