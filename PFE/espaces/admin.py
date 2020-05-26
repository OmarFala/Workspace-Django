from django.contrib import admin

# Register your models here.

from .models import espace,plan

admin.site.register(espace)
admin.site.register(plan)
