from django.urls import path
from . import views

urlpatterns = [
    path('flagged/', views.flagged_content, name='flagged_content'),
    path('<str:content_id>/remove/', views.remove_content, name='remove_content'),
    path('<str:content_id>/approve/', views.approve_content, name='approve_content'),
    path('<str:content_id>/details/', views.content_details, name='content_details'),
]