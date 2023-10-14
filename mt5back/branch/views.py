from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.core.paginator import Paginator
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Branch
from .serializers import BranchGeoJSONSerializer, BranchSerializer


class BranchGeoJSONView(APIView):
    def get(self, request):
        branches = Branch.objects.all()
        serializer = BranchGeoJSONSerializer(branches, many=True)
        geojson = {
            "type": "FeatureCollection",
            "features": serializer.data
        }
        return Response(geojson)


class BranchListView(APIView):

    DEFAULT_LIMIT = 10

    def get(self, request):
        limit = int(request.GET.get('limit', 0))
        offset = int(request.GET.get('offset', 0))
        lat = request.GET.get('lat', None)
        lon = request.GET.get('lon', None)

        branches = Branch.objects.all()

        if lat and lon:
            point = Point(float(lon), float(lat), srid=4326)
            branches = branches.annotate(distance=Distance('location', point)).order_by('distance')

        paginator = Paginator(branches, limit)
        if limit == 0:
            serialized_branches = BranchSerializer(branches, many=True).data
        else:
            page = (offset // limit) + 1
            serialized_branches = BranchSerializer(paginator.page(page).object_list, many=True).data

        return Response(serialized_branches)


class BranchDetailView(APIView):

    def get_object(self, pk):
        try:
            return Branch.objects.get(pk=pk)
        except Branch.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        branch = self.get_object(pk)
        serializer = BranchSerializer(branch)
        return Response(serializer.data)
