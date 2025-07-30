from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class AdminUser(AbstractUser):
    """Extended admin user model"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    is_super_admin = models.BooleanField(default=False)
    profile_picture = models.URLField(blank=True, null=True)
    
    class Meta:
        db_table = 'admin_users'


class AdminSession(models.Model):
    """Track admin user sessions"""
    user = models.ForeignKey(AdminUser, on_delete=models.CASCADE, related_name='sessions')
    session_key = models.CharField(max_length=40, unique=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'admin_sessions'
        ordering = ['-last_activity']


class LoginAttempt(models.Model):
    """Track login attempts for security"""
    username = models.CharField(max_length=150)
    ip_address = models.GenericIPAddressField()
    success = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    user_agent = models.TextField(blank=True)
    
    class Meta:
        db_table = 'login_attempts'
        ordering = ['-timestamp']