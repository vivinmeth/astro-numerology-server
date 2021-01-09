from django.urls import path
from django.conf.urls.static import static

from astro_server import settings

from . import views

app_name = 'astrology'
urlpatterns = [
    path('get_lord_planets', views.get_lord_planets, name="get_lord_planets"),
    path('', views.return_404, name="return_404"),

] + static(settings.STATIC_ROOT, document_root= settings.STATIC_ROOT)
