from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from user.models import user
from user.serializers import userSerializer
from rest_framework.decorators import api_view, permission_classes


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([AllowAny, ])
def user_list(request):
    if request.method == 'GET':
        users = user.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            users = users.filter(title__icontains=title)

        users_serializer = userSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = userSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = user.objects.all().delete()
        return JsonResponse({'message': '{} users were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny, ])
def user_detail(request, pk):
    try:
        user = user.objects.get(pk=pk)
    except user.DoesNotExist:
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        user_serializer = userSerializer(user)
        return JsonResponse(user_serializer.data)

    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user_serializer = userSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'user was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny, ])
def user_list_published(request):
    users = user.objects.filter(published=True)

    if request.method == 'GET':
        users_serializer = userSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
