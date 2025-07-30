from django.urls import path
from . import views

urlpatterns = [
    path('closet/', views.closet_analytics, name='closet_analytics'),
    path('polls/', views.poll_analytics, name='poll_analytics'),
    path('top-outfits/', views.top_outfits, name='top_outfits'),
    path('ad-revenue/', views.ad_revenue_breakdown, name='ad_revenue_breakdown'),
    path('user-engagement/', views.user_engagement, name='user_engagement'),
]