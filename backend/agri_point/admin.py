from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Post)
admin.site.register(Crop)
admin.site.register(Product)
admin.site.register(Equipment)
admin.site.register(Role)
admin.site.register(Address)
admin.site.register(UserAddress)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(OrderItem)