from django.db import models

# Create your models here.


class espace(models.Model):
    code = models.CharField(max_length=20, blank=False)
    nom = models.CharField(max_length=20, blank=False)
    type = models.CharField(max_length=20, blank=False)
    documentsModule = models.BooleanField(default=False, blank=False)
    documentsModuleActivation = models.BooleanField(default=False)

    def __str__(self):
        return self.nom

