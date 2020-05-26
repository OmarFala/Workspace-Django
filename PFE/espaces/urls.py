from rest_framework import routers
from .api import espaceViewSet, planViewSet
from django.urls import path, include


router = routers.DefaultRouter()
router.register('api/espace', espaceViewSet, 'espace')
router.register('api/plan', espaceViewSet, 'plan')

urlpatterns = router.urls