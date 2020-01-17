from django.contrib import admin
from .models import LoginModel # add this

class LoginAdmin(admin.ModelAdmin):  # add this
    list_display = ('name', 'address', 'email') # add this

# Register your models here.
admin.site.register(LoginModel, LoginAdmin)