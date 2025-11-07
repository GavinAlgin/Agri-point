from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)

    def __str__(self):
        return self.title


class Crop(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="crops")
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    ai_advice = models.TextField(blank=True, null=True)
    planted_at = models.DateField()

    def __str__(self):
        return self.name


class Livestock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='livestock')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    weight = models.IntegerField()
    condition = models.CharField(max_length=100)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)

    def __str__(self):
        return self.name


# CATEGORY AND PRODUCT MODELS
class Category(models.Model):
    category_name = models.CharField(max_length=255)

    def __str__(self):
        return self.category_name
    

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.FloatField(default=0.0)
    special_price = models.FloatField(default=0.0)
    quantity = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Equipment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="equipment")
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class FarmingAdviceRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="farming_advice_request")
    crop_type = models.CharField(max_length=100, blank=True, null=True)
    livestock_type = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255)
    problem_description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


# AI response
class ai_response(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ai_interactions')
    question  = models.TextField()
    response = models.TextField()
    created_at =models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

# EXTENDING THE MODELS

# USER AND ROLE MODELS
class Role(models.Model):
    role_name = models.CharField(max_length=50)

    def __str__(self):
        return self.role_name
    

class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)


# ADDRESS MODELS
class Address(models.Model):
    building_name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.street}, {self.city}"
    

class UserAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)


# CART MODELS
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.FloatField(default=0.0)

    def __str__(self):
        return f"Cart {self.id} - {self.user.username}"
    

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    discount = models.FloatField(default=0.0)
    product_price = models.FloatField(default=0.0)


# ORDER AND PAYMENT MODELS
class Payment(models.Model):
    payment_method = models.CharField(max_length=255)

    def __str__(self):
        return self.payment_method
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=255)
    order_date = models.DateField(auto_now_add=True)
    order_status = models.CharField(max_length=255, default='Pending')
    total_amount = models.FloatField(default=0.0)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Order {self.id} - {self.user.username}"
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    ordered_product_price = models.FloatField()
    discount = models.FloatField(default=0.0)
    quantity = models.IntegerField(default=1)