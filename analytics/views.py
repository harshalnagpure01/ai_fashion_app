from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from fashion_admin.firebase_service import firebase_service
from datetime import datetime, timedelta
from django.utils import timezone


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def closet_analytics(request):
    """Get closet upload analytics"""
    try:
        engagement_data = firebase_service.get_engagement_analytics()
        
        # Mock detailed analytics
        analytics = {
            'total_uploads': engagement_data.get('closet_uploads', 0),
            'uploads_this_month': 234,
            'average_items_per_user': 23.5,
            'category_breakdown': [
                {'category': 'Tops', 'count': 1247, 'percentage': 35.2},
                {'category': 'Bottoms', 'count': 892, 'percentage': 25.1},
                {'category': 'Dresses', 'count': 567, 'percentage': 16.0},
                {'category': 'Shoes', 'count': 445, 'percentage': 12.5},
                {'category': 'Accessories', 'count': 398, 'percentage': 11.2}
            ],
            'upload_trends': [
                {'date': (timezone.now() - timedelta(days=i)).date().isoformat(), 
                 'uploads': 45 + (i % 7) * 8} for i in range(30, 0, -1)
            ]
        }
        
        return Response({
            'success': True,
            'data': analytics
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def poll_analytics(request):
    """Get poll participation analytics"""
    try:
        engagement_data = firebase_service.get_engagement_analytics()
        
        analytics = {
            'total_polls': engagement_data.get('poll_count', 0),
            'total_votes': engagement_data.get('voting_engagement', 0),
            'average_votes_per_poll': 8.3,
            'participation_rate': 67.5,  # percentage
            'top_categories': [
                {'category': 'Casual', 'polls': 234, 'votes': 1876},
                {'category': 'Formal', 'polls': 189, 'votes': 1543},
                {'category': 'Evening', 'polls': 156, 'votes': 1234},
                {'category': 'Workout', 'polls': 134, 'votes': 987},
                {'category': 'Beach', 'polls': 98, 'votes': 756}
            ],
            'poll_trends': [
                {'date': (timezone.now() - timedelta(days=i)).date().isoformat(), 
                 'polls_created': 12 + (i % 5) * 3,
                 'votes_cast': 89 + (i % 7) * 15} for i in range(14, 0, -1)
            ]
        }
        
        return Response({
            'success': True,
            'data': analytics
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def top_outfits(request):
    """Get top voted outfits"""
    try:
        # Mock data - in real implementation, query from Firebase
        top_outfits = [
            {
                'id': 1,
                'title': 'Summer Beach Vibes',
                'votes': 234,
                'user_id': 'user123',
                'user_name': 'Jessica Style',
                'category': 'Beach',
                'created_at': '2024-01-25T14:30:00Z',
                'image_url': 'https://example.com/outfit1.jpg'
            },
            {
                'id': 2,
                'title': 'Business Casual Chic',
                'votes': 198,
                'user_id': 'user456',
                'user_name': 'Emma Fashion',
                'category': 'Formal',
                'created_at': '2024-01-24T09:15:00Z',
                'image_url': 'https://example.com/outfit2.jpg'
            },
            {
                'id': 3,
                'title': 'Weekend Comfort',
                'votes': 167,
                'user_id': 'user789',
                'user_name': 'Sarah Trends',
                'category': 'Casual',
                'created_at': '2024-01-23T16:45:00Z',
                'image_url': 'https://example.com/outfit3.jpg'
            }
        ]
        
        return Response({
            'success': True,
            'data': top_outfits
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def ad_revenue_breakdown(request):
    """Get ad revenue analytics"""
    try:
        revenue_data = firebase_service.get_revenue_analytics()
        
        # Mock detailed ad analytics
        ad_analytics = {
            'total_ad_revenue': revenue_data.get('ad_revenue', 0),
            'revenue_this_month': 1234.56,
            'impression_count': 45678,
            'click_through_rate': 2.3,  # percentage
            'ecpm': 3.45,  # earnings per thousand impressions
            'revenue_by_placement': [
                {'placement': 'Banner', 'revenue': 567.89, 'impressions': 23456},
                {'placement': 'Interstitial', 'revenue': 432.10, 'impressions': 12345},
                {'placement': 'Native', 'revenue': 234.57, 'impressions': 9876}
            ],
            'daily_revenue': [
                {'date': (timezone.now() - timedelta(days=i)).date().isoformat(), 
                 'revenue': 45.67 + (i % 5) * 12.34} for i in range(30, 0, -1)
            ]
        }
        
        return Response({
            'success': True,
            'data': ad_analytics
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_engagement(request):
    """Get user engagement metrics"""
    try:
        user_analytics = firebase_service.get_user_analytics()
        
        engagement_metrics = {
            'daily_active_users': user_analytics.get('daily_active_users', 0),
            'weekly_active_users': 1245,
            'monthly_active_users': 3456,
            'session_duration': {
                'average': 12.5,  # minutes
                'median': 8.3
            },
            'retention_rates': {
                'day_1': 78.5,  # percentage
                'day_7': 45.2,
                'day_30': 23.7
            },
            'engagement_by_feature': [
                {'feature': 'Closet Management', 'usage': 89.2},
                {'feature': 'Outfit Polls', 'usage': 76.8},
                {'feature': 'AI Recommendations', 'usage': 54.3},
                {'feature': 'Social Voting', 'usage': 67.1}
            ]
        }
        
        return Response({
            'success': True,
            'data': engagement_metrics
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)