from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from fashion_admin.firebase_service import firebase_service


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def flagged_content(request):
    """Get all flagged content"""
    try:
        content_data = firebase_service.get_flagged_content()
        
        return Response({
            'success': True,
            'data': content_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def remove_content(request, content_id):
    """Remove flagged content"""
    try:
        content_type = request.data.get('type', 'poll')
        success = firebase_service.remove_content(content_id, content_type)
        
        if success:
            return Response({
                'success': True,
                'message': 'Content removed successfully'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'error': 'Failed to remove content'
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def approve_content(request, content_id):
    """Approve flagged content (remove flag)"""
    try:
        content_type = request.data.get('type', 'poll')
        
        # Update the flagged status to False in Firebase
        collection = 'polls' if content_type == 'poll' else 'comments'
        firebase_service.db.collection(collection).document(content_id).update({
            'flagged': False,
            'reviewed_by': request.user.username,
            'reviewed_at': firebase_service.datetime.now()
        })
        
        return Response({
            'success': True,
            'message': 'Content approved successfully'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def content_details(request, content_id):
    """Get detailed view of specific content"""
    try:
        content_type = request.GET.get('type', 'poll')
        collection = 'polls' if content_type == 'poll' else 'comments'
        
        doc = firebase_service.db.collection(collection).document(content_id).get()
        
        if not doc.exists:
            return Response({
                'success': False,
                'error': 'Content not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        content_data = doc.to_dict()
        content_data['id'] = doc.id
        content_data['type'] = content_type
        
        # Get additional context (user info, related content)
        if 'user_id' in content_data:
            user_info = firebase_service.get_user_by_uid(content_data['user_id'])
            content_data['user_info'] = user_info
        
        return Response({
            'success': True,
            'data': content_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)