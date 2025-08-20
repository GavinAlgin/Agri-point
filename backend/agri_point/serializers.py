from rest_framework import serializers
from .models import Post, Crop, Product, Equipment, FarmingAdviceRequest, Livestock
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['user']

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ['id', 'user', 'name', 'quantity', 'planted_at', 'image', 'ai_advice']
        read_only_fields = ['user', 'ai_advice']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['user']


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
        read_only_fields = ['user']


class FarmingAdviceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmingAdviceRequest
        fields = '__all__'
        read_only_fields = ['user']


class LivestockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livestock
        fields = '__all__'
        read_only_fields = ['user']
