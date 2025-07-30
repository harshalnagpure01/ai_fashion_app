from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta
from fashion_admin.firebase_service import firebase_service


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_overview(request):
    """Get dashboard overview data"""
    try:
        # Get user analytics
        user_analytics = firebase_service.get_user_analytics()
        
        # Get engagement analytics
        engagement_analytics = firebase_service.get_engagement_analytics()
        
        # Get revenue analytics
        revenue_analytics = firebase_service.get_revenue_analytics()
        
        overview_data = {
            'total_users': user_analytics.get('total_users', 0),
            'daily_active_users': user_analytics.get('daily_active_users', 0),
            'total_revenue': revenue_analytics.get('total_revenue', 0),
            'subscription_revenue': revenue_analytics.get('subscription_revenue', 0),
            'ad_revenue': revenue_analytics.get('ad_revenue', 0),
            'closet_uploads': engagement_analytics.get('closet_uploads', 0),
            'poll_count': engagement_analytics.get('poll_count', 0),
            'voting_engagement': engagement_analytics.get('voting_engagement', 0),
        }
        
        return Response({
            'success': True,
            'data': overview_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_login_trends(request):
    """Get user login trends for charts"""
    try:
        # Mock data for demonstration - in real implementation, 
        # this would query Firebase Analytics or Auth logs
        days = request.GET.get('days', 30)
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=int(days))
        
        # Generate mock trend data
        trends = []
        current_date = start_date
        while current_date <= end_date:
            # In real implementation, query actual login data from Firebase
            trends.append({
                'date': current_date.isoformat(),
                'logins': 50 + (current_date.day % 10) * 5,  # Mock data
                'new_users': 10 + (current_date.day % 5) * 2  # Mock data
            })
            current_date += timedelta(days=1)
        
        return Response({
            'success': True,
            'data': {
                'trends': trends,
                'period': f'{days} days'
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def voting_engagement_stats(request):
    """Get voting engagement statistics"""
    try:
        # Mock data - in real implementation, query from Firebase
        engagement_data = {
            'total_votes': firebase_service.get_engagement_analytics().get('voting_engagement', 0),
            'daily_votes': [
                {'date': (timezone.now() - timedelta(days=i)).date().isoformat(), 
                 'votes': 100 + i * 10} for i in range(7, 0, -1)
            ],
            'top_categories': [
                {'category': 'Casual', 'votes': 1250},
                {'category': 'Formal', 'votes': 890},
                {'category': 'Evening', 'votes': 675},
                {'category': 'Workout', 'votes': 430},
                {'category': 'Beach', 'votes': 320}
            ]
        }
        
        return Response({
            'success': True,
            'data': engagement_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def subscription_trends(request):
    """Get subscription trends over time"""
    try:
        # Mock data - in real implementation, query from Firebase subscriptions
        months = 12
        trends = []
        current_date = timezone.now().replace(day=1)
        
        for i in range(months):
            month_date = current_date - timedelta(days=30*i)
            trends.insert(0, {
                'month': month_date.strftime('%Y-%m'),
                'monthly_subscriptions': 50 + (i % 6) * 15,
                'annual_subscriptions': 20 + (i % 4) * 8,
                'revenue': (50 + (i % 6) * 15) * 9.99 + (20 + (i % 4) * 8) * 99.99,
                'cancellations': 5 + (i % 3) * 2
            })
        
        return Response({
            'success': True,
            'data': {
                'trends': trends,
                'period': f'{months} months'
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def recent_activity(request):
    """Get recent platform activity"""
    try:
        # Mock data - in real implementation, aggregate from various Firebase collections
        activities = [
            {
                'id': 1,
                'type': 'user_registration',
                'description': 'New user registered: jessica@example.com',
                'timestamp': (timezone.now() - timedelta(minutes=15)).isoformat(),
                'severity': 'info'
            },
            {
                'id': 2,
                'type': 'content_flagged',
                'description': 'Poll flagged for inappropriate content',
                'timestamp': (timezone.now() - timedelta(minutes=45)).isoformat(),
                'severity': 'warning'
            },
            {
                'id': 3,
                'type': 'subscription',
                'description': 'Premium subscription purchased',
                'timestamp': (timezone.now() - timedelta(hours=2)).isoformat(),
                'severity': 'success'
            },
            {
                'id': 4,
                'type': 'ai_prompt',
                'description': 'New AI prompt template created',
                'timestamp': (timezone.now() - timedelta(hours=3)).isoformat(),
                'severity': 'info'
            },
            {
                'id': 5,
                'type': 'notification',
                'description': 'Push notification sent to 1,250 users',
                'timestamp': (timezone.now() - timedelta(hours=5)).isoformat(),
                'severity': 'info'
            }
        ]
        
        return Response({
            'success': True,
            'data': activities
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def performance_metrics(request):
    """Get system performance metrics"""
    try:
        # Mock performance data
        metrics = {
            'api_response_time': {
                'average': 245,  # milliseconds
                'p95': 580,
                'p99': 1200
            },
            'error_rate': {
                'percentage': 0.12,
                'total_errors': 23,
                'total_requests': 19167
            },
            'active_connections': 1847,
            'database_connections': 45,
            'memory_usage': {
                'used': '2.3 GB',
                'total': '8 GB',
                'percentage': 28.75
            },
            'storage_usage': {
                'used': '156 GB',
                'total': '500 GB',
                'percentage': 31.2
            }
        }
        
        return Response({
            'success': True,
            'data': metrics
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)