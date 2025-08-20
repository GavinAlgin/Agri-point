import random
from django.shortcuts import render
from rest_framework import viewsets
from .models import Post, Crop, Product, Equipment, FarmingAdviceRequest, Livestock
from .serializers import PostSerializer, CropSerializer, UserSerializer, ProductSerializer, EquipmentSerializer, FarmingAdviceRequestSerializer, LivestockSerializer
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# auth
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'password': user.password
    })

class CropViewSet(viewsets.ModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        crop = Crop.objects.all()

        # Simulate AI call which we can replace with AI/ML model later
        advice = self.get_ai_advice(crop.name, crop.quantity)
        crop.ai_advice = advice
        crop.save()

    def get_ai_advice(self, crop_name, quantity):
        # E.g., Dummy AI logic
        tips = [
            f"For {crop_name}, ensure proper irrigation to boost yields.",
            f"Monitor {crop_name} for pests weekly.",
            f"Add organic fertilizer to improve {crop_name} growth.",
            f"Planting density for {crop_name} should match soil fertility."
        ]
        return random.choice(tips)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.filter(type='equipment')
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FarmingAdviceRequestViewSet(viewsets.ModelViewSet):
    queryset = FarmingAdviceRequest.objects.all()
    serializer_class = FarmingAdviceRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LivestockViewSet(viewsets.ModelViewSet):
    queryset = Livestock.objects.all()
    serializer_class = LivestockSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Signup view
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    

# Login View
@api_view(['POST'])
def logout_view(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)