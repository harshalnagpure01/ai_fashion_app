from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.paginator import Paginator
from fashion_admin.firebase_service import firebase_service


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_users(request):
    """List all users with pagination and search"""
    try:
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 20))
        search = request.GET.get('search', '')
        
        # Get users from Firebase
        users_data = firebase_service.get_users()
        users = users_data.get('users', [])
        
        # Filter by search term if provided
        if search:
            users = [user for user in users if 
                    search.lower() in user.get('email', '').lower() or
                    search.lower() in user.get('display_name', '').lower()]
        
        # Paginate results
        total_users = len(users)
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        paginated_users = users[start_index:end_index]
        
        return Response({
            'success': True,
            'data': {
                'users': paginated_users,
                'pagination': {
                    'page': page,
                    'page_size': page_size,
                    'total': total_users,
                    'pages': (total_users + page_size - 1) // page_size
                }
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_detail(request, uid):
    """Get detailed user information"""
    try:
        user = firebase_service.get_user_by_uid(uid)
        
        if not user:
            return Response({
                'success': False,
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Get user activity data (mock for now)
        user_activity = {
            'total_polls': 15,
            'total_uploads': 42,
            'total_votes': 89,
            'last_login': user.get('last_sign_in'),
            'account_created': user.get('created_at'),
            'recent_activity': [
                {
                    'type': 'poll_created',
                    'description': 'Created outfit poll for evening wear',
                    'timestamp': '2024-01-29T10:30:00Z'
                },
                {
                    'type': 'closet_upload',
                    'description': 'Added 3 new items to closet',
                    'timestamp': '2024-01-28T15:45:00Z'
                },
                {
                    'type': 'vote_cast',
                    'description': 'Voted on 5 outfit polls',
                    'timestamp': '2024-01-28T09:20:00Z'
                }
            ]
        }
        
        return Response({
            'success': True,
            'data': {
                'user': user,
                'activity': user_activity
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def disable_user(request, uid):
    """Disable a user account"""
    try:
        success = firebase_service.disable_user(uid)
        
        if success:
            return Response({
                'success': True,
                'message': 'User disabled successfully'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'error': 'Failed to disable user'
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_user(request, uid):
    """Delete a user account"""
    try:
        if not request.user.is_super_admin:
            return Response({
                'success': False,
                'error': 'Permission denied. Only super admins can delete users.'
            }, status=status.HTTP_403_FORBIDDEN)
        
        success = firebase_service.delete_user(uid)
        
        if success:
            return Response({
                'success': True,
                'message': 'User deleted successfully'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'error': 'Failed to delete user'
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_analytics(request):
    """Get user analytics and statistics"""
    try:
        analytics = firebase_service.get_user_analytics()
        
        # Additional mock analytics data
        extended_analytics = {
            **analytics,
            'growth_rate': 12.5,  # percentage
            'user_segments': {
                'active': 1245,
                'inactive': 234,
                'premium': 156,
                'new_this_week': 89
            },
            'geographic_distribution': [
                {'country': 'United States', 'users': 456},
                {'country': 'United Kingdom', 'users': 234},
                {'country': 'Canada', 'users': 189},
                {'country': 'Australia', 'users': 123},
                {'country': 'Germany', 'users': 98}
            ],
            'age_distribution': [
                {'range': '18-24', 'users': 345},
                {'range': '25-34', 'users': 567},
                {'range': '35-44', 'users': 234},
                {'range': '45-54', 'users': 123},
                {'range': '55+', 'users': 67}
            ]
        }
        
        return Response({
            'success': True,
            'data': extended_analytics
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def enable_user(request, uid):
    """Re-enable a disabled user account"""
    try:
        # Re-enable user in Firebase Auth (update disabled status to False)
        from firebase_admin import auth
        auth.update_user(uid, disabled=False)
        
        return Response({
            'success': True,
            'message': 'User enabled successfully'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)