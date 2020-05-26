from rest_framework import serializers
from .models import espace
from .models import plan

class espaceSerializer(serializers.ModelSerializer):

    class Meta:
        model=espace
        fields='__all__'


class planSerializer(serializers.ModelSerializer):

    class Meta:
        model=plan
        fields='__all__'