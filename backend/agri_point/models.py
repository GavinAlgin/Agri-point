from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Crop(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="crops")
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    planted_at = models.DateField()

    def __str__(self):
        return self.name


