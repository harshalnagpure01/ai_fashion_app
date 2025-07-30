from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_templates, name='list_templates'),
    path('create/', views.create_template, name='create_template'),
    path('<int:template_id>/', views.get_template, name='get_template'),
    path('<int:template_id>/update/', views.update_template, name='update_template'),
    path('<int:template_id>/delete/', views.delete_template, name='delete_template'),
]