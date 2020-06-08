from django.db import models
from datetime import datetime

# Create your models here.


class document(models.Model):
    code = models.CharField(max_length=50)
    titre = models.CharField(max_length=50)
    version = models.CharField(max_length=50, default="PDF.V01")
    size = models.DecimalField(max_digits=20, decimal_places=2, default=2.00)
    created_at = models.DateTimeField(blank=True, default=datetime.now)

    def __str__(self):
        return self.titre
