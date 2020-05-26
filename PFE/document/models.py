from django.db import models

# Create your models here.

class document(models.Model):
    code = models.CharField(max_length=50)
    titre = models.CharField(max_length=50)
    size = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)

    def __str__(self):
        return self.titre