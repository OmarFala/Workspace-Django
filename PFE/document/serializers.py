from rest_framework import serializers
from .models import document

class documentSerializer(serializers.ModelSerializer):

    class Meta:
        model=document
        fields='__all__'