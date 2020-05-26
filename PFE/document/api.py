from .models import document
from rest_framework import viewsets, permissions
from .serializers import documentSerializer

# Lead Viewset


class documentViewSet(viewsets.ModelViewSet):
    queryset=document.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = documentSerializer
