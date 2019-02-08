# questionnaire/serializers.py

from rest_framework import serializers
from .models import Questionnaire, QA


class QASerializer(serializers.ModelSerializer):
    class Meta:
        model = QA
        fields = ('title', 'response', 'is_last', 'pid', 'path')


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ('id', 'title','content',)
