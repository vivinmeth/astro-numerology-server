from django.db import models

# Create your models here.


class PlanetZodiacMap(models.Model):
    Deg = models.IntegerField(null=False)
    M1 = models.IntegerField(null=False)
    S1 = models.IntegerField(null=False)
    DecimalDeg = models.FloatField(null=False)
    RA = models.CharField(null=False, max_length=250)
    NA = models.CharField(null=False, max_length=250)
    UA = models.CharField(null=False, max_length=250)
    R = models.CharField(null=False, max_length=250)
    N = models.CharField(null=False, max_length=250)
