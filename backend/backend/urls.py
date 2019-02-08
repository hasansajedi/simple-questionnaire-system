# backend/urls.py
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from questionnaire import views
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'questionnaires', views.QuestionnaireView, 'questionnaire')

urlpatterns = [
    path('api/', include(router.urls)),
    path('qad/<int:pk>/<query>/', views.QuestionAnswer.as_view()),
]
# urlpatterns = format_suffix_patterns(urlpatterns)
