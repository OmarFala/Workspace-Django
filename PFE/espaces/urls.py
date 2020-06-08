from django.conf.urls import url
from espaces import views

urlpatterns = [
    url('api/espaces', views.espace_list),
    url('api/espaces/(?P<pk>[0-9]+)', views.espace_detail),
    url('api/espaces/published$', views.espace_list_published)
]
