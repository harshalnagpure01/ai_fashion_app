from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import AdminUser, AdminSession, LoginAttempt


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128, write_only=True)
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(
                request=self.context.get('request'),
                username=username,
                password=password
            )
            
            if not user:
                raise serializers.ValidationError('Invalid credentials.')
            
            if not user.is_active:
                raise serializers.ValidationError('Account is disabled.')
            
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Username and password required.')


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'is_super_admin', 'profile_picture', 'created_at', 'last_login']
        read_only_fields = ['id', 'created_at', 'last_login']


class AdminSessionSerializer(serializers.ModelSerializer):
    user = AdminUserSerializer(read_only=True)
    
    class Meta:
        model = AdminSession
        fields = ['id', 'user', 'ip_address', 'user_agent', 'created_at', 
                 'last_activity', 'is_active']
        read_only_fields = ['id', 'created_at']


class LoginAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginAttempt
        fields = ['id', 'username', 'ip_address', 'success', 'timestamp', 'user_agent']
        read_only_fields = ['id', 'timestamp']


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    confirm_password = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("New passwords don't match.")
        return attrs