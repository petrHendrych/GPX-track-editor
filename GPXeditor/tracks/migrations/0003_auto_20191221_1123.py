# Generated by Django 3.0 on 2019-12-21 10:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0002_gpxfile_gpxpoint_gpxtrack'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gpxpoint',
            name='gpx_file',
        ),
        migrations.DeleteModel(
            name='Track',
        ),
        migrations.DeleteModel(
            name='GPXPoint',
        ),
    ]