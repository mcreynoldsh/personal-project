# Generated by Django 4.0.6 on 2022-08-14 19:31

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('paw_platoon_app', '0013_alter_walk_pets'),
    ]

    operations = [
        migrations.AddField(
            model_name='walk',
            name='date',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 8, 14, 19, 31, 14, 403733, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
