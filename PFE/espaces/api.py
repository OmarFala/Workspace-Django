from .models import espace
from .models import plan
from rest_framework import viewsets, permissions
from .serializers import espaceSerializer, planSerializer

# Lead Viewset


class espaceViewSet(viewsets.ModelViewSet):
    queryset=espace.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = espaceSerializer



class planViewSet(viewsets.ModelViewSet):
    queryset=plan.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = planSerializer