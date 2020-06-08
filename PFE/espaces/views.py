from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from espaces.models import espace
from espaces.serializers import espaceSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def espace_list(request):
    if request.method == 'GET':
        espaces = espace.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            espaces = espaces.filter(title__icontains=title)

        espaces_serializer = espaceSerializer(espaces, many=True)
        return JsonResponse(espaces_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        espace_data = JSONParser().parse(request)
        espace_serializer = espaceSerializer(data=espace_data)
        if espace_serializer.is_valid():
            espace_serializer.save()
            return JsonResponse(espace_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(espace_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = espace.objects.all().delete()
        return JsonResponse({'message': '{} espaces were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def espace_detail(request, pk):
    try:
        espace = espace.objects.get(pk=pk)
    except espace.DoesNotExist:
        return JsonResponse({'message': 'The espace does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        espace_serializer = espaceSerializer(espace)
        return JsonResponse(espace_serializer.data)

    elif request.method == 'PUT':
        espace_data = JSONParser().parse(request)
        espace_serializer = espaceSerializer(espace, data=espace_data)
        if espace_serializer.is_valid():
            espace_serializer.save()
            return JsonResponse(espace_serializer.data)
        return JsonResponse(espace_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        espace.delete()
        return JsonResponse({'message': 'espace was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def espace_list_published(request):
    espaces = espace.objects.filter(published=True)

    if request.method == 'GET':
        espaces_serializer = espaceSerializer(espaces, many=True)
        return JsonResponse(espaces_serializer.data, safe=False)
