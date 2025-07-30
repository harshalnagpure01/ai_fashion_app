from django.urls import path
from . import views

urlpatterns = [
    path('overview/', views.dashboard_overview, name='dashboard_overview'),
    path('login-trends/', views.user_login_trends, name='user_login_trends'),
    path('voting-engagement/', views.voting_engagement_stats, name='voting_engagement_stats'),
    path('subscription-trends/', views.subscription_trends, name='subscription_trends'),
    path('recent-activity/', views.recent_activity, name='recent_activity'),
    path('performance-metrics/', views.performance_metrics, name='performance_metrics'),
]