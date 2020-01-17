from django.urls import path

from . import views

urlpatterns = [
    path('user', views.UserView.as_view()),
    path('register', views.register),
    path('user/<int:id>', views.UserDetails.as_view()),
    path('change_password/<int:id>', views.changePassword),
    path('login', views.LoginView.as_view()),
    path('logout', views.LogoutView.as_view()),
]