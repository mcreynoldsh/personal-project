from django.contrib.auth.models import (AbstractUser)
from django.db import models

class BaseManager(models.Manager):
    def get_by_natural_key(self,id,name):
        return self.get(id = id, name=name)


class Base(models.Model):
    name = models.CharField(max_length=255, unique=True)


    class Meta:
        unique_together = [['id','name']]
    
    def natural_key(self):
        return(self.id, self.name)

class User(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    bases = models.ManyToManyField(Base)
    address = models.CharField(max_length=255)
    profile_pic = models.FileField(upload_to='../media/', blank=True)
    is_provider = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    rate = models.CharField(max_length=255,blank=True, default='$25')
    bio = models.TextField(blank=True)
    zip_code = models.CharField(max_length=5, default='79606')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.
    def __str__(self):
        return self.email

class Walker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.user.__str__()

class AppUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    walker = models.ForeignKey(Walker, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.user.__str__()
    

class Pet(models.Model):
    name = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.CharField(max_length=255)
    age = models.CharField(max_length=255)
    pet_pic = models.FileField(upload_to='../media/', blank = True)
    def __str__(self):
        return self.name
    def natural_key(self):
        return(self.id, self.name)

class Walk(models.Model):
    walker = models.ForeignKey(Walker, on_delete=models.CASCADE)
    pets = models.ManyToManyField(Pet, related_name="walks")
    date = models.CharField(max_length= 255)
    walk_length = models.CharField(max_length=255, blank=True)
    walk_time = models.CharField(max_length=255)
    notes = models.TextField(blank= True)
    complete = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
