from django.conf.urls import url
from document import views

urlpatterns = [
    url('api/documents', views.document_list),
    url('api/documents/(?P<pk>[0-9]+)', views.document_detail),
    url('api/documents/published$', views.document_list_published)
]
