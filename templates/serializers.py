from rest_framework import serializers
from .models import PromptTemplate


class PromptTemplateSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = PromptTemplate
        fields = ['id', 'title', 'category', 'text', 'is_active', 'created_by',
                 'created_by_name', 'created_at', 'updated_at', 'usage_count']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at', 'usage_count']