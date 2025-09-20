from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from agri_point.views import PostViewSet, CropViewSet, RegisterView, ProductViewSet, EquipmentViewSet, FarmingAdviceRequestViewSet, LivestockViewSet, logout_view, current_user_view, identity_crop
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'crops', CropViewSet)
router.register(r'products', ProductViewSet)
router.register(r'equipment', EquipmentViewSet)
router.register(r'farmingadvice', FarmingAdviceRequestViewSet)
router.register(r'livestock', LivestockViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/identity-crop/', identity_crop, name='identity_crop'),

    # Auth
    path('api/register/', RegisterView.as_view(), name="register"),
    path('api/login/', TokenObtainPairView.as_view(), name="login"),
    path('api/user/', current_user_view, name='current-user'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/logout/', logout_view, name="logout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)