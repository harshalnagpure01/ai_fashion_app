from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class PromptTemplate(models.Model):
    CATEGORY_CHOICES = [
        ('occasion', 'Occasion'),
        ('weather', 'Weather'),
        ('mood', 'Mood'),
        ('style', 'Style'),
        ('color', 'Color'),
        ('season', 'Season'),
    ]
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    text = models.TextField()
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_templates')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    usage_count = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'prompt_templates'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} ({self.category})"