from django.db import models

# Create your models here.

from django.utils.timezone import datetime

class user(models.Model):
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    email =  models.EmailField()
    language = models.CharField(default='Francais', max_length=30)
    created_at = models.DateTimeField(blank=True, auto_now_add=True)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.firstname+" "+self.lastname

