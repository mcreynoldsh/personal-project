# Generated by Django 4.0.6 on 2022-08-16 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paw_platoon_app', '0020_user_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='rate',
            field=models.CharField(blank=True, default='$25', max_length=255),
        ),
    ]
