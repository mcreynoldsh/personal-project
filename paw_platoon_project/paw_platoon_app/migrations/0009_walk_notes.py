# Generated by Django 4.0.6 on 2022-08-08 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paw_platoon_app', '0008_user_bio'),
    ]

    operations = [
        migrations.AddField(
            model_name='walk',
            name='notes',
            field=models.TextField(blank=True),
        ),
    ]
