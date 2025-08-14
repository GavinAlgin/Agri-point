from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from agri_point.views import PostViewSet, CropViewSet, RegisterView, ProductViewSet, EquipmentViewSet, logout_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'crops', CropViewSet)
router.register(r'products', ProductViewSet)
router.register(r'equipment', EquipmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # Auth
    path('api/register/', RegisterView.as_view(), name="register"),
    path('api/login/', TokenObtainPairView.as_view(), name="login"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/logout/', logout_view, name="logout"),
]
