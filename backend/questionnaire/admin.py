# questionnaire/admin.py

from django.contrib import admin
from .models import Questionnaire, QA


@admin.register(Questionnaire)
class QuestionnaireAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(QA)
class QAAdmin(admin.ModelAdmin):
    list_display = ('title', 'response', 'is_last')
    list_select_related = (
        'pid',
    )
