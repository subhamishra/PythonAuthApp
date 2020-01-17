from django.db import models
# Create your models here.

# add this
class LoginModel(models.Model):
    password = models.CharField(max_length=120, null=False)
    email = models.EmailField(null=False)
    userId = models.DecimalField(decimal_places=0,max_digits=12)
    name = models.CharField(max_length=60, null=False)
    address = models.TextField(null=True)
    last_login = models.DateTimeField(null=True)