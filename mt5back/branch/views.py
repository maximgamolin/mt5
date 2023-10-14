from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.core.paginator import Paginator
from django.db.models import Q
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Branch
from .serializers import BranchGeoJSONSerializer, BranchSerializer, BranchDetailSerializer


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

    def get(self, request):
        """
        limit - количество записей на странице
        offset - смещение от начала
        lat - широта
        lon - долгота
        work_day_individuals - рабочий день для ФЛ
        work_day_legals - filter рабочий день для ЮЛ
        works_time_individuals - рабочее время для ФЛ
        works_time_legals - рабочее время для ЮЛ
        """
        limit = int(request.GET.get('limit', 0))
        offset = int(request.GET.get('offset', 0))
        lat = request.GET.get('lat', None)
        lon = request.GET.get('lon', None)

        work_day_individuals = request.GET.get('work_day_individuals', None)
        work_day_legals = request.GET.get('work_day_legals', None)
        works_time_individuals = request.GET.get('works_time_individuals', None)
        works_time_legals = request.GET.get('works_time_legals', None)

        branches = Branch.objects.all()

        if lat and lon:
            point = Point(float(lon), float(lat), srid=4326)
            branches = branches.annotate(distance=Distance('location', point)).order_by('distance')

        if work_day_individuals:
            branches = branches.filter(
                Q(branchopenhours__day=work_day_individuals) &
                Q(branchopenhours__for_individuals=True)
            ).distinct()

        if work_day_legals:
            branches = branches.filter(
                Q(branchopenhours__day=work_day_legals) &
                Q(branchopenhours__for_legals=True)
            ).distinct()

        if works_time_individuals:
            branches = branches.filter(
                Q(branchopenhours__opening_time__lte=works_time_individuals) &
                Q(branchopenhours__closing_time__gte=works_time_individuals) &
                Q(branchopenhours__for_individuals=True)
            ).distinct()

        if works_time_legals:
            branches = branches.filter(
                Q(branchopenhours__opening_time__lte=works_time_legals) &
                Q(branchopenhours__closing_time__gte=works_time_legals) &
                Q(branchopenhours__for_legals=True)
            ).distinct()

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
        serializer = BranchDetailSerializer(branch)
        return Response(serializer.data)
