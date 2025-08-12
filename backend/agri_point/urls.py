from django.urls import path, include
from .views import register_user, RegisterView, PostListCreateView, CropListCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [ 
    path('api/register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('posts/', PostListCreateView.as_view(), name='posts'),
    path('crops/', CropListCreateView.as_view(), name='crops'),
]
