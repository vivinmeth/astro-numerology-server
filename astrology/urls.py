from django.urls import path
from . import views

app_name = 'astrology'
urlpatterns = [
    path('calc_star_aspects', views.calc_star_aspects, name="calculate_star"),
    path('', views.star_aspect, name="star_aspect"),

]
