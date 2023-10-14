from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ATM
from .serializers import GeoJsonATMSerializer, ATMSerializer


class GeoJsonATMApiView(APIView):

    def get(self, request):
        atms = ATM.objects.all()
        serializer = GeoJsonATMSerializer(atms, many=True)
        geojson = {
            "type": "FeatureCollection",
            "features": serializer.data
        }
        return Response(geojson)


class ATMApiView(APIView):

    def get(self, request):
        """
        limit - количество записей на странице
        offset - смещение от начала
        lat - широта для сортировки ближайших банкоматов
        lon - долгота для сортировки ближайших банкоматов
        service_name - фильтр по названию услуги
        service_activity - фильтр по активности услуги service_name:value
        service_capability - фильтр по возможности услуги service_name:value
        all_day - фильтр по круглосуточности
        :param request:
        :return:
        """
        limit = int(request.GET.get('limit', 0))
        offset = int(request.GET.get('offset', 0))
        lat = request.GET.get('lat', None)
        lon = request.GET.get('lon', None)
        service_activity = request.GET.getlist('service_activity', [])
        service_capability = request.GET.getlist('service_capability', [])
        all_day = request.GET.get('all_day', None)

        atms = ATM.objects.all()

        if service_activity:
            for i in service_activity:
                name, value = i.split(':')
                atms = atms.filter(
                    atmservice__activity=value,
                    atmservice__service__name=name
                ).distinct()

        if service_capability:
            for i in service_capability:
                name, value = i.split(':')
                atms = atms.filter(
                    atmservice__capability=value,
                    atmservice__service__name=name
                ).distinct()

        if all_day:
            atms = atms.filter(all_day=all_day)

        if lat and lon:
            point = Point(float(lon), float(lat), srid=4326)
            atms = atms.annotate(distance=Distance('location', point)).order_by('distance')

        paginator = Paginator(atms, limit)
        if limit == 0:
            serialized_atms = ATMSerializer(atms, many=True).data
        else:
            page = (offset // limit) + 1
            serialized_atms = ATMSerializer(paginator.page(page).object_list, many=True).data

        return Response(serialized_atms)


class ATMDetailView(APIView):

    def get(self, request, atm_id):
        atm = get_object_or_404(ATM, pk=atm_id)
        serializer = ATMSerializer(atm)
        return Response(serializer.data)

