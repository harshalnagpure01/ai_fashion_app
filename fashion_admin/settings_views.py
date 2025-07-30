from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.conf import settings
from .firebase_service import firebase_service
from datetime import datetime


@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def feature_flags(request):
    """Get or update feature flags"""
    try:
        if request.method == 'GET':
            # Get current feature flags from settings and Firebase
            flags = getattr(settings, 'FEATURE_FLAGS', {})
            
            return Response({
                'success': True,
                'data': flags
            }, status=status.HTTP_200_OK)
        
        elif request.method == 'PUT':
            flag_name = request.data.get('flag_name')
            enabled = request.data.get('enabled')
            
            if not flag_name or enabled is None:
                return Response({
                    'success': False,
                    'error': 'Flag name and enabled status are required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            success = firebase_service.update_feature_flag(flag_name, enabled)
            
            if success:
                return Response({
                    'success': True,
                    'message': f'Feature flag {flag_name} updated successfully'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'error': 'Failed to update feature flag'
                }, status=status.HTTP_400_BAD_REQUEST)
                
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def system_thresholds(request):
    """Get or update system thresholds"""
    try:
        if request.method == 'GET':
            thresholds = getattr(settings, 'THRESHOLDS', {})
            
            return Response({
                'success': True,
                'data': thresholds
            }, status=status.HTTP_200_OK)
        
        elif request.method == 'PUT':
            threshold_name = request.data.get('threshold_name')
            value = request.data.get('value')
            
            if not threshold_name or value is None:
                return Response({
                    'success': False,
                    'error': 'Threshold name and value are required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            success = firebase_service.update_threshold(threshold_name, value)
            
            if success:
                return Response({
                    'success': True,
                    'message': f'Threshold {threshold_name} updated successfully'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'error': 'Failed to update threshold'
                }, status=status.HTTP_400_BAD_REQUEST)
                
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def system_status(request):
    """Get system status and health"""
    try:
        # Mock system status - in real implementation, check various services
        status_data = {
            'api_status': 'healthy',
            'database_status': 'healthy',
            'firebase_status': 'healthy',
            'redis_status': 'healthy',
            'last_updated': '2024-01-29T12:00:00Z',
            'version': '1.0.0',
            'uptime': '15 days, 4 hours',
            'services': [
                {'name': 'Authentication', 'status': 'healthy', 'response_time': '45ms'},
                {'name': 'User Management', 'status': 'healthy', 'response_time': '32ms'},
                {'name': 'Content Moderation', 'status': 'healthy', 'response_time': '67ms'},
                {'name': 'Notifications', 'status': 'healthy', 'response_time': '123ms'},
                {'name': 'Analytics', 'status': 'healthy', 'response_time': '89ms'}
            ]
        }
        
        return Response({
            'success': True,
            'data': status_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def backup_data(request):
    """Trigger data backup"""
    try:
        if not request.user.is_super_admin:
            return Response({
                'success': False,
                'error': 'Permission denied. Only super admins can trigger backups.'
            }, status=status.HTTP_403_FORBIDDEN)
        
        # Mock backup process
        backup_id = f"backup_{int(datetime.now().timestamp())}"
        
        return Response({
            'success': True,
            'message': 'Backup initiated successfully',
            'backup_id': backup_id
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)