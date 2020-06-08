from django.db import models

# Create your models


class plan(models.Model):
    payant = models.BooleanField(default=False)
    pack = models.IntegerField()
    max_entities = models.IntegerField()
    max_stockage = models.IntegerField()
    debut_periode = models.DateTimeField(blank=True)
    fin_periode = models.DateTimeField(blank=True)
