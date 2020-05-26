from rest_framework import routers
from .api import userViewSet
from django.urls import path, include


router = routers.DefaultRouter()
router.register('api/user', userViewSet, 'user')

urlpatterns = router.urls