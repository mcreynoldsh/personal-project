from . import views
from django.urls import path


urlpatterns = [
    path('', views.index),
    path('signup', views.signup),
    path('login', views.login),
    path('checkuser', views.check_user),
    path('logout', views.log_out),
    path('addpet', views.add_pet),
    path('checkpets', views.check_pets),
    path('addbase', views.add_base),
    path('checkbases', views.check_bases),
    path('connectpal', views.connect_pal),
    path('user/<int:user_id>', views.user_detail),
    path('providers/connect', views.connect_provider),
    path('provider/get', views.get_provider),
    path('schedulewalk', views.schedule_walk),
    path('getpetwalks', views.get_pet_walks),
    path('checkconnections', views.check_connections),
    path('getproviderwalks', views.get_provider_walks),
    path('getwalk/<int:walk_id>', views.get_walk),
    path('completewalk', views.complete_walk),
    path('getcompletedwalks', views.get_completed_walks),
    path('pet/<int:pet_id>', views.pet_detail)
]
