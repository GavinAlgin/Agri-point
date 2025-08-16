from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)

    def __str__(self):
        return self.title


class Crop(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="crops")
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    ai_advice = models.TextField(blank=True, null=True)
    planted_at = models.DateField()

    def __str__(self):
        return self.name


class Livestock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='livestock')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    weight = models.IntegerField()
    condition = models.CharField(max_length=100)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Equipment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="equipment")
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class FarmingAdviceRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="farming_advice_request")
    crop_type = models.CharField(max_length=100, blank=True, null=True)
    livestock_type = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255)
    problem_description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)