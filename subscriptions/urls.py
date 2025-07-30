from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_subscriptions, name='list_subscriptions'),
    path('pricing/', views.pricing_plans, name='pricing_plans'),
    path('analytics/', views.subscription_analytics, name='subscription_analytics'),
]