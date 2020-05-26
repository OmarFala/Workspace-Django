from django.db import models

# Create your models here.


class espace(models.Model):
    code = models.CharField(max_length=20)
    nom = models.CharField(max_length=20)
    type =  models.CharField(max_length=20)
    documentsModule = models.BooleanField(default=False)
    documentsModuleActivation = models.BooleanField(default=FalseS)

    def __str__(self):
        return self.nom


class plan(models.Model):
    payant=models.BooleanField(default="false")
    pack=models.IntegerField()
    max_entities=models.IntegerField()
    max_stockage=models.IntegerField()
    debut_periode=models.DateTimeField(blank=True)
    fin_periode=models.DateTimeField(blank=True)