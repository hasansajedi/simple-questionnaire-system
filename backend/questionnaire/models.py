# questionnaire/models.py

from django.db import models


class Questionnaire(models.Model):
    title = models.CharField(max_length=120)
    content = models.CharField(max_length=120)

    def _str_(self):
        return self.title

class QA(models.Model):
    pid = models.IntegerField(default=1)
    title = models.CharField(max_length=120)
    response = models.TextField()
    is_last = models.BooleanField(default=False)
    path = models.TextField()

    def _str_(self):
        return self.title
