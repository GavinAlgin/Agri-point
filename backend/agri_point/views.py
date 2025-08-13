from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework import status, permissions, generics
from .serializers import PostSerializer, CropSerializer, RegisterSerializer
from .models import Post, Crop

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


# @api_view(['POST'])
# def register_user(request):
#     username = request.data.get('username')
#     email = request.data.get('email')
#     password = request.data.get('password')
#     confirm_password = request.data.get('confirm_password')

#     if password != confirm_password:
#         return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

#     if User.objects.filter(username=username).exists():
#         return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

#     if User.objects.filter(email=email).exists():
#         return Response({'error': 'Email already registered'}, status=status.HTTP_404_NOT_FOUND)

#     user = User.objects.create_user(username=username, email=email, password=password)
#     user.save()

#     return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
        }
        return data
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])    
@permission_classes([permissions.IsAuthenticated])
def protected_route(request):
    return Response({'message': f"Hello {request.user.username}, protected content."})


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CropListCreateView(generics.ListCreateAPIView):
    serializer_class = CropSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Crop.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)