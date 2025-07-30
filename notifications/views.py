from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from fashion_admin.firebase_service import firebase_service
from datetime import datetime


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def send_notification(request):
    """Send push notification"""
    try:
        title = request.data.get('title')
        body = request.data.get('body')
        target_type = request.data.get('target_type', 'all')
        target_value = request.data.get('target_value')
        scheduled_time = request.data.get('scheduled_time')
        
        if not title or not body:
            return Response({
                'success': False,
                'error': 'Title and body are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        result = firebase_service.send_notification(
            title=title,
            body=body,
            target_type=target_type,
            target_value=target_value,
            scheduled_time=scheduled_time
        )
        
        if result.get('success'):
            return Response({
                'success': True,
                'message': result.get('message', 'Notification sent successfully'),
                'message_id': result.get('message_id')
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'error': result.get('error', 'Failed to send notification')
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def notification_history(request):
    """Get notification history"""
    try:
        # Mock data - in real implementation, query from Firebase
        notifications = [
            {
                'id': 1,
                'title': 'New Weekly Challenge!',
                'body': 'Check out this week\'s outfit challenge',
                'target_type': 'all',
                'status': 'delivered',
                'sent_at': '2024-01-29T10:00:00Z',
                'delivered_count': 1247,
                'opened_count': 456
            },
            {
                'id': 2,
                'title': 'Your Poll Results',
                'body': 'See who voted on your latest outfit poll',
                'target_type': 'user',
                'status': 'delivered',
                'sent_at': '2024-01-28T15:30:00Z',
                'delivered_count': 1,
                'opened_count': 1
            },
            {
                'id': 3,
                'title': 'Weekend Sale Alert',
                'body': '20% off premium subscriptions this weekend only!',
                'target_type': 'all',
                'status': 'scheduled',
                'scheduled_for': '2024-01-30T09:00:00Z',
                'delivered_count': 0,
                'opened_count': 0
            }
        ]
        
        return Response({
            'success': True,
            'data': notifications
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def notification_templates(request):
    """Get notification templates"""
    try:
        templates = [
            {
                'id': 1,
                'name': 'Weekly Challenge',
                'title': 'New Weekly Challenge!',
                'body': 'Check out this week\'s {challenge_type} challenge',
                'category': 'engagement'
            },
            {
                'id': 2,
                'name': 'Poll Results',
                'title': 'Your Poll Results',
                'body': 'See who voted on your latest outfit poll',
                'category': 'user_activity'
            },
            {
                'id': 3,
                'name': 'Subscription Reminder',
                'title': 'Premium Features Awaiting!',
                'body': 'Upgrade to premium for unlimited polls and AI recommendations',
                'category': 'subscription'
            }
        ]
        
        return Response({
            'success': True,
            'data': templates
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)