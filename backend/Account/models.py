from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    fullName = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phoneNumber = models.CharField(max_length=10, unique=True)
    profileImage = models.ImageField(upload_to="profile_images", null=True, blank=True)
    is_active = models.BooleanField(default=True)
    seller_status = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["fullName", "phoneNumber"]

    def __str__(self):
        return self.email

class Seller(CustomUser):
    # Additional fields specific to sellers
   
    sellerCertificate = models.ImageField(upload_to="seller_certificates", null=True, blank=True)

    def save(self, *args, **kwargs):
        # Set is_staff to True when saving a Seller instance
        self.is_staff = True
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    
class Address(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    addresss = models.CharField(max_length=255)
    

