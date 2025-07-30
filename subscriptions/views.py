from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from fashion_admin.firebase_service import firebase_service


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_subscriptions(request):
    """List all subscriptions"""
    try:
        subscriptions = firebase_service.get_subscriptions()
        
        return Response({
            'success': True,
            'data': subscriptions
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def pricing_plans(request):
    """Get or update pricing plans"""
    try:
        if request.method == 'GET':
            # Mock pricing data - in real implementation, get from Firebase
            plans = {
                'monthly': {
                    'price': 9.99,
                    'features': ['Unlimited polls', 'AI recommendations', 'Ad-free experience'],
                    'active': True
                },
                'annual': {
                    'price': 99.99,
                    'features': ['Unlimited polls', 'AI recommendations', 'Ad-free experience', 'Premium support'],
                    'active': True
                }
            }
            
            return Response({
                'success': True,
                'data': plans
            }, status=status.HTTP_200_OK)
        
        elif request.method == 'PUT':
            plan_type = request.data.get('plan_type')
            amount = request.data.get('amount')
            
            if not plan_type or not amount:
                return Response({
                    'success': False,
                    'error': 'Plan type and amount are required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            success = firebase_service.update_subscription_pricing(plan_type, amount)
            
            if success:
                return Response({
                    'success': True,
                    'message': 'Pricing updated successfully'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'error': 'Failed to update pricing'
                }, status=status.HTTP_400_BAD_REQUEST)
                
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def subscription_analytics(request):
    """Get subscription analytics"""
    try:
        revenue_data = firebase_service.get_revenue_analytics()
        
        # Additional analytics
        analytics = {
            **revenue_data,
            'conversion_rate': 12.5,  # percentage
            'churn_rate': 3.2,  # percentage
            'average_ltv': 234.50,  # average lifetime value
            'monthly_breakdown': [
                {'month': '2024-01', 'new_subs': 45, 'cancellations': 8, 'revenue': 1247.55},
                {'month': '2024-02', 'new_subs': 52, 'cancellations': 6, 'revenue': 1398.22},
                {'month': '2024-03', 'new_subs': 38, 'cancellations': 12, 'revenue': 1156.78},
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