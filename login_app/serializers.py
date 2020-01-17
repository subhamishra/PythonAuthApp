from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username', "")
        password = data.get('password', "")

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise exceptions.ValidationError('User is not active!')
            else:
                raise exceptions.ValidationError('User Id Or Password is wrong! Try Again')
        else:
            if username:
                raise exceptions.ValidationError('password should not be empty!')
            else:
                raise exceptions.ValidationError('Username and Password should not be empty!')
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( 'id','first_name','last_name', 'email', 'is_active', 'username', 'password' )

    def update(self, instance, data):
        try:
            if data['password']:
                instance.set_password(data['password'])
                del data['password']
        except:
            pass
        return super().update(instance, data)
    
    def create(self, data):
        try:
            if data['password']:
                update = True
        except:
            pass
        if update:
            instance = super().create(data)
            instance.set_password(data['password'])
            del data['password']
            return super().update(instance, data)
        else:
            raise exceptions.ValidationError('Please put password to create!')
            