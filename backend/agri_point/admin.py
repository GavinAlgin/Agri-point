from django.contrib import admin
from .models import Post, Crop, Product, Equipment, Livestock

# Register your models here.
admin.site.register(Post)
admin.site.register(Crop)
admin.site.register(Product)
admin.site.register(Equipment)
admin.site.register(Livestock)