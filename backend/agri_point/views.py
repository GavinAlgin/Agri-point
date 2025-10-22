import random
import requests
from rest_framework import status
from django.shortcuts import render
from rest_framework import viewsets
from django.core.mail import send_mail
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.utils.encoding import force_bytes
from rest_framework import generics, permissions
from django.utils.http import urlsafe_base64_encode
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.decorators import api_view, permission_classes, action
from .models import Address, Cart, CartItem, Category, Order, OrderItem, Payment, Post, Crop, Product, Equipment, FarmingAdviceRequest, Livestock, Role, UserAddress
from .serializers import (
    AddressSerializer, CartItemSerializer, CartSerializer, CategorySerializer, OrderItemSerializer, OrderSerializer, PaymentSerializer, PostSerializer, CropSerializer, RoleSerializer, UserAddressSerializer, UserSerializer, ProductSerializer, EquipmentSerializer, 
    FarmingAdviceRequestSerializer, LivestockSerializer, ResetPasswordRequestSerializer, 
    SetNewPasswordSerializer
)

PLANT_API_KEY = "t4BJQ00zXdqLKNEbNwkO"
MODEL_ID = "plant-disease-detection-v2-2nclk/1"

# @api_view(["POST"])
# def identity_crop(request):
#     image_file = request.FILES.get("image")
#     if not image_file:
#         return Response({"error": "No image uploaded"}, status=400)

#     url = f"https://detect.roboflow.com/{MODEL_ID}?api_key={PLANT_API_KEY}"

#     # Send request to Roboflow API
#     response = requests.post(url, files={"file": image_file})

#     files = {
#         'image': image_file.read()
#     }
#     response = request.post(
#         headers={"Api-Key": PLANT_API_KEY},
#         files={'images': image_file}
#     )

#     if response.status_code == 200:
#         data = response.json()
#         # Extract best prediction
#         suggestion = data.get('result', {}).get('classification', {}).get("suggestions", [])[0]
#         return Response({
#             "crop_detected": suggestion.get("name", "Unknown"),
#             "probability": suggestion.get("probability", 0),
#             "raw_response": data
#         })
#     else:
#         return Response({'error': "API request failed", "details": request.text}, status=500)

@api_view(["POST"])
def identity_crop(request):
    image_file = request.FILES.get("image")
    if not image_file:
        return Response({"error": "No image uploaded"}, status=400)

    # Roboflow inference endpoint
    url = f"https://detect.roboflow.com/{MODEL_ID}?api_key={PLANT_API_KEY}"

    # Send request to Roboflow API
    response = requests.post(url, files={"file": image_file})

    if response.status_code == 200:
        data = response.json()

        # Extract the best prediction
        predictions = data.get("predictions", [])
        if predictions:
            best = max(predictions, key=lambda x: x.get("confidence", 0))
            return Response({
                "crop_detected": best.get("class", "Unknown"),
                "confidence": best.get("confidence", 0),
                "raw_response": data
            })
        else:
            return Response({"message": "No disease detected", "raw_response": data})
    else:
        return Response(
            {"error": "Failed to analyze image", "details": response.text},
            status=response.status_code
        )

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
        crop = serializer.save(user=self.request.user)

        # Simulate AI call which we can replace with AI/ML model later
        advice = self.get_ai_advice(crop.name, crop.quantity)
        crop.ai_advice = advice
        crop.save()

    def get_queryset(self):
        return Crop.objects.all()
    
    def retrieve(self, request, *args, **kwargs):
        crop = self.get_object()
        advice = self.get_ai_advice(crop.name, crop.quantity)

        serializer = self.get_serializer(crop)
        data = serializer.data
        data['advice'] = advice
        return Response(data)

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



# Extended viewsets for the extended serializers
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserAddressViewSet(viewsets.ModelViewSet):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
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


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    serializer = ResetPasswordRequestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email']

    try:
        user = User.objects.get(email=email)
        token = PasswordResetTokenGenerator().make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.id))

        reset_link = f"http://localhost:3000/reset-password/{uidb64}/{token}"  # change to your frontend URL

        send_mail(
            subject="Password Reset Request",
            message=f"Click the link to reset your password: {reset_link}",
            from_email="noreply@agri-point.com",
            recipient_list=[user.email],
        )

        return Response({"message": "Password reset link sent"}, status=200)
    except User.DoesNotExist:
        return Response({"error": "No user with this email"}, status=404)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    serializer = SetNewPasswordSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({"message": "Password reset successful"}, status=200)