# questionnaire/views.py
# -*- coding: utf-8 -*-
import os

from rest_framework import viewsets, status

from rest_framework.response import Response
from rest_framework.views import APIView

from .parser.json_parser import json_parser
from .serializers import QuestionnaireSerializer, QASerializer
from .models import Questionnaire, QA

class QuestionnaireView(viewsets.ModelViewSet):
    # 1. Show questionnaires list (user can select what questionnaire he/she will pass)
    model = Questionnaire
    serializer_class = QuestionnaireSerializer

    def get_queryset(self):
        try:
            jp = json_parser()
            lst = jp.get_questionnaires()
            return lst
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionAnswer(APIView):
    def get(self, request, pk, query, format=None):
        try:
            jp = json_parser()
            lst = (jp.get_xpath_values(xpaths='$.' + query))
            serializer_class = QASerializer(lst, many=True)
            serialized_data = serializer_class.data
            print(serialized_data)
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)

