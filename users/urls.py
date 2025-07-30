from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_users, name='list_users'),
    path('<str:uid>/', views.get_user_detail, name='get_user_detail'),
    path('<str:uid>/disable/', views.disable_user, name='disable_user'),
    path('<str:uid>/enable/', views.enable_user, name='enable_user'),
    path('<str:uid>/delete/', views.delete_user, name='delete_user'),
    path('analytics/overview/', views.user_analytics, name='user_analytics'),
]