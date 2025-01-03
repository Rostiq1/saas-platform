
# Настройка Django для интеграции с React

import os
from django.conf import settings
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/build/static')
]
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

class ReactTemplateView(TemplateView):
    template_name = "frontend/build/index.html"

from django.urls import path, re_path
from .views import ReactTemplateView

urlpatterns = [
    re_path(r'^.*$', ReactTemplateView.as_view(), name='react-app'),
]

urlpatterns += staticfiles_urlpatterns()
