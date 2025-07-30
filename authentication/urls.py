from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('profile/update/', views.update_profile_view, name='update_profile'),
    path('change-password/', views.change_password_view, name='change_password'),
    path('sessions/', views.active_sessions_view, name='active_sessions'),
    path('sessions/<int:session_id>/terminate/', views.terminate_session_view, name='terminate_session'),
    path('login-attempts/', views.login_attempts_view, name='login_attempts'),
    path('refresh-token/', views.refresh_token_view, name='refresh_token'),
]