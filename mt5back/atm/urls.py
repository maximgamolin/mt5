# urls.py
from django.urls import path

from .views import GeoJsonATMApiView, ATMApiView, ATMDetailView

urlpatterns = [
    path('geojson/', GeoJsonATMApiView.as_view(), name='atm-geojson'),
    path('', ATMApiView.as_view(), name='atm-list'),
    path('<int:atm_id>/', ATMDetailView.as_view(), name='atm-detail'),
]
