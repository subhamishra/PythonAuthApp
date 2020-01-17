from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from login_app.serializers import LoginSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login as user_login, logout as user_logout
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, get_authorization_header, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
import datetime

# Create your views here.


def index(request):
    return render(request, 'index.html')

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            sendData = serializer.data
            del sendData['username']
            del sendData['password']
            return JsonResponse(sendData, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

class UserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = User.objects.all()
        serializer = UserSerializer(instances, many=True)
        sendData = serializer.data
        for data in sendData:
            del data['username']
            del data['password']
        return JsonResponse(sendData, safe=False, status=200)
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            sendData = serializer.data
            del sendData['username']
            del sendData['password']
            return JsonResponse(sendData, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def changePassword(request, id):
    try:
        instance = User.objects.get(id=id)
    except:
        return JsonResponse({ 'error': 'Requested User Does Not Exist!' }, status=404)
    data = JSONParser().parse(request)
    serializer = UserSerializer(instance, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        sendData = serializer.data
        del sendData['username']
        del sendData['password']
        return JsonResponse(sendData, status=200)
    else:
        return JsonResponse(serializer.errors, status=400)

class UserDetails(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            return User.objects.get(id=id)
        except:
            return JsonResponse({ 'error': 'Requested User Does Not Exist!' }, status=404)
    
    def get(self, request, id=None):
        instance = self.get_object(id)
        serializer = UserSerializer(instance)
        sendData = serializer.data
        del sendData['username']
        del sendData['password']

        return JsonResponse(sendData, safe=False, status=200)

    def post(self, request, id=None):
        instance = self.get_object(id)
        data = JSONParser().parse(request)
        try:
            if data['username'] or data['password']:
                if data['username']:
                    return JsonResponse({ 'message': 'Cant Change Username!'}, status=400)
                else:
                    return JsonResponse({ 'message': 'Please use password change modal to change password'}, status=400)
        except:
            try:
                if data['password']:
                    return JsonResponse({ 'message': 'Please use password change modal to change password'}, status=400)
            except:
                pass
        serializer = UserSerializer(instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            sendData = serializer.data
            del sendData['username']
            del sendData['password']
            return JsonResponse(sendData, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    
    def delete(self, request, id=None):
        instance = self.get_object(id)
        instance.delete()

        return JsonResponse({ 'message': 'User Deleted successfully!'}, status=200)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        sendData = user_serializer.data
        del sendData['username']
        del sendData['password']

        return JsonResponse({'token': token.key, 'user': sendData, 'created': created }, status=200)

class LogoutView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user_logout(request)
        auth = get_authorization_header(request).split()
        token = auth[1].decode()
        tokenObject = Token.objects.select_related('user').get(key=token)
        tokenObject.delete()
        
        return JsonResponse({ 'message': 'Logout Successfully!'}, status=200)