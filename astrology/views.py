from django.http import HttpResponse

# Create your views here.


def index(req):

    return HttpResponse("Hello from Astro_server")
