from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from document.models import document
from document.serializers import documentSerializer
from rest_framework.decorators import api_view, permission_classes


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([AllowAny, ])
def document_list(request):
    if request.method == 'GET':
        documents = document.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            documents = documents.filter(title__icontains=title)

        documents_serializer = documentSerializer(documents, many=True)
        return JsonResponse(documents_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        document_data = JSONParser().parse(request)
        document_serializer = documentSerializer(data=document_data)
        if document_serializer.is_valid():
            document_serializer.save()
            return JsonResponse(document_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(document_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = document.objects.all().delete()
        return JsonResponse({'message': '{} documents were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny, ])
def document_detail(request, pk):
    try:
        document = document.objects.get(pk=pk)
    except document.DoesNotExist:
        return JsonResponse({'message': 'The document does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        document_serializer = documentSerializer(document)
        return JsonResponse(document_serializer.data)

    elif request.method == 'PUT':
        document_data = JSONParser().parse(request)
        document_serializer = documentSerializer(document, data=document_data)
        if document_serializer.is_valid():
            document_serializer.save()
            return JsonResponse(document_serializer.data)
        return JsonResponse(document_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        document.delete()
        return JsonResponse({'message': 'document was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny, ])
def document_list_published(request):
    documents = document.objects.filter(published=True)

    if request.method == 'GET':
        documents_serializer = documentSerializer(documents, many=True)
        return JsonResponse(documents_serializer.data, safe=False)
