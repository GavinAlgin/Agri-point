from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from agri_point.views import(
    AddressViewSet, CartItemViewSet, CartViewSet, CategoryViewSet, OrderItemViewSet, OrderViewSet, PaymentViewSet, PostViewSet, CropViewSet, RegisterView, ProductViewSet, EquipmentViewSet, 
    FarmingAdviceRequestViewSet, LivestockViewSet, RoleViewSet, UserAddressViewSet, UserViewSet, logout_view, current_user_view, 
    identity_crop, password_reset_request, password_reset_confirm, AIInteractionListCreateView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'crops', CropViewSet)
router.register(r'products', ProductViewSet)
router.register(r'equipment', EquipmentViewSet)
router.register(r'farmingadvice', FarmingAdviceRequestViewSet)
router.register(r'livestock', LivestockViewSet)

# Extended routers
router.register('users', UserViewSet)
router.register('roles', RoleViewSet)
router.register('addresses', AddressViewSet)
router.register('user-addresses', UserAddressViewSet)
router.register('categories', CategoryViewSet)
router.register('carts', CartViewSet)
router.register('cart-items', CartItemViewSet)
router.register('payments', PaymentViewSet)
router.register('orders', OrderViewSet)
router.register('order-items', OrderItemViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # AI Chat interactions (save + fetch)
    path('api/ai/response/', AIInteractionListCreateView.as_view(), name='ai_response'),
    path('api/identity-crop/', identity_crop, name='identity_crop'),

    # Auth
    path('api/register/', RegisterView.as_view(), name="register"),
    path('api/login/', TokenObtainPairView.as_view(), name="login"),
    path('api/user/', current_user_view, name='current-user'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/logout/', logout_view, name="logout"),

    # Password reset endpoints
    path('api/password-reset/', password_reset_request, name="password_reset"),
    path('api/password-reset/confirm/', password_reset_confirm, name="password_reset_confirm"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)