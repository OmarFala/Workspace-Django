from rest_framework import routers
from .api import documentViewSet
from django.urls import path, include


router = routers.DefaultRouter()
router.register('api/document', documentViewSet, 'document')

urlpatterns = router.urls