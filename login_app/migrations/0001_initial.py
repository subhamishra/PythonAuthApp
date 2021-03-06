# Generated by Django 3.0.2 on 2020-01-13 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('userId', models.DecimalField(decimal_places=0, max_digits=12)),
                ('name', models.CharField(max_length=60)),
                ('address', models.TextField()),
            ],
        ),
    ]
