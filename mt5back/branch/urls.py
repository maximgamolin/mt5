from django.urls import path

from .views import BranchGeoJSONView, BranchListView, BranchDetailView

urlpatterns = [
    path('geojson/', BranchGeoJSONView.as_view(), name='branch-geojson'),
    path('branches/<int:pk>/', BranchDetailView.as_view(), name='branch-detail'),
    path('', BranchListView.as_view(), name='branch-list'),
]