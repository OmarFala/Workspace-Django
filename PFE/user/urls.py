from django.conf.urls import url
from user import views

urlpatterns = [
    url('api/users', views.user_list),
    url('api/users/(?P<pk>[0-9]+)', views.user_detail),
    url('api/users/published$', views.user_list_published)
]
