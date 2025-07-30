from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import PromptTemplate
from .serializers import PromptTemplateSerializer


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_templates(request):
    """List all prompt templates"""
    try:
        category = request.GET.get('category', '')
        search = request.GET.get('search', '')
        
        templates = PromptTemplate.objects.all()
        
        if category:
            templates = templates.filter(category=category)
        
        if search:
            templates = templates.filter(title__icontains=search)
        
        serializer = PromptTemplateSerializer(templates, many=True)
        
        return Response({
            'success': True,
            'data': serializer.data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_template(request):
    """Create new prompt template"""
    try:
        serializer = PromptTemplateSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response({
                'success': True,
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_template(request, template_id):
    """Get specific template details"""
    try:
        template = PromptTemplate.objects.get(id=template_id)
        serializer = PromptTemplateSerializer(template)
        
        return Response({
            'success': True,
            'data': serializer.data
        }, status=status.HTTP_200_OK)
        
    except PromptTemplate.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Template not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_template(request, template_id):
    """Update existing template"""
    try:
        template = PromptTemplate.objects.get(id=template_id)
        serializer = PromptTemplateSerializer(template, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except PromptTemplate.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Template not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_template(request, template_id):
    """Delete template"""
    try:
        template = PromptTemplate.objects.get(id=template_id)
        template.delete()
        
        return Response({
            'success': True,
            'message': 'Template deleted successfully'
        }, status=status.HTTP_200_OK)
        
    except PromptTemplate.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Template not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)