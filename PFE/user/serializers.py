from rest_framework import serializers
from .models import user

class userSerializer(serializers.ModelSerializer):
   # firstname = serializers.CharField(max_length=20)
    #lastname = serializers.CharField(max_length=20)
    #email =  serializers.EmailField()
    #language = serializers.CharField(default='Francais', max_length=30)

    class Meta:
        model=user
        fields='__all__'

   # def create(self, validated_data):
    #    User = user.objects.create(**validated_data)
     #   return User