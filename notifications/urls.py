from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.send_notification, name='send_notification'),
    path('history/', views.notification_history, name='notification_history'),
    path('templates/', views.notification_templates, name='notification_templates'),
]