from django.contrib.gis.geos import Point
from django.db.models import Subquery
from rest_framework import serializers

from .models import Branch, BranchOpenHours, BranchLoad, BranchOperations, Operations


class OperationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operations
        fields = [
            'id', 'name', 'slug'
        ]

class BranchOpenHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchOpenHours
        fields = [
            'id', 'day', 'opening_time', 'closing_time', 'is_holiday',
            'for_individuals', 'for_legals', 'is_break'
        ]


class BranchGeoJSONSerializer(serializers.BaseSerializer):
    def to_representation(self, instance: Branch):
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [instance.longitude, instance.latitude]
            },
            "properties": {
                "name": instance.name,
                "address": instance.address,
                'id': instance.id
            }
        }


class BranchSerializer(serializers.ModelSerializer):

    def __init__(
            self, *args, current_time=None, current_day=None, my_lat=None, my_lon=None, **kwargs
    ):
        super().__init__(*args, **kwargs)
        self.current_time = current_time
        self.current_day = current_day
        self.my_lat = my_lat
        self.my_lon = my_lon

    current_load_level = serializers.SerializerMethodField()
    distance = serializers.SerializerMethodField()
    time_in_line = serializers.SerializerMethodField()
    current_regime = serializers.SerializerMethodField()

    def get_current_regime(self, obj):
        if self.current_day:
            branch_open_hours = obj.branchopenhours_set.filter(
                day=self.current_day
            ).first()
            return BranchOpenHoursSerializer(branch_open_hours).data
        else:
            return None

    def get_current_load_level(self, obj):
        if self.current_time and self.current_day:
            try:
                load = obj.branchload_set.get(
                    day=self.current_day,
                    start__lte=self.current_time,
                    end__gte=self.current_time
                )
                if load.load <= 33:
                    return 1
                elif 33 < load.load <= 66:
                    return 2
                else:
                    return 3
            except BranchLoad.DoesNotExist:
                return None
        else:
            return None

    def get_time_in_line(self, obj):
        if self.current_time and self.current_day:
            try:
                load = obj.branchload_set.get(
                    day=self.current_day,
                    start__lte=self.current_time,
                    end__gte=self.current_time
                )
                if load.load <= 33:
                    return "5 - 7 минут"
                elif 33 < load.load <= 66:
                    return "15 - 20 минут"
                else:
                    return "от 30 минут"
            except BranchLoad.DoesNotExist:
                return None
        else:
            return None

    def get_distance(self, obj):
        if self.my_lat and self.my_lon:
            point = Point(float(self.my_lon), float(self.my_lat), srid=4326)
            distance = obj.location.distance(point) * 100
            return distance
        return None

    class Meta:
        model = Branch
        fields = [
            'id', 'name', 'address', 'latitude', 'longitude',
            'current_load_level', 'distance', 'time_in_line',
            'current_regime'
        ]





class BranchLoadSerializer(serializers.ModelSerializer):

    class Meta:
        model = BranchLoad
        fields = [
            'id', 'branch', 'day', 'load', 'start', 'end'
        ]


class BranchDetailSerializer(serializers.ModelSerializer):

    open_hours = BranchOpenHoursSerializer(
        source='branchopenhours_set', many=True
    )
    load = serializers.SerializerMethodField()
    current_load_level = serializers.SerializerMethodField()
    distance = serializers.SerializerMethodField()
    time_in_line = serializers.SerializerMethodField()
    current_regime = serializers.SerializerMethodField()
    operations = serializers.SerializerMethodField()

    def __init__(
            self, *args, current_time=None, current_day=None, my_lat=None, my_lon=None, **kwargs
    ):
        super().__init__(*args, **kwargs)
        self.current_time = current_time
        self.current_day = current_day
        self.my_lat = my_lat
        self.my_lon = my_lon

    def get_operations(self, obj):
        operations = Operations.objects.filter(
            id__in=Subquery(BranchOperations.objects.filter(branch=obj).values('operations_id'))
        )
        return OperationsSerializer(operations, many=True).data

    def get_load(self, obj):
        if self.current_day:
            return BranchLoadSerializer(
                obj.branchload_set.filter(day=self.current_day), many=True
            ).data
        else:
            return BranchLoadSerializer(
                obj.branchload_set.all(), many=True
            ).data

    def get_current_regime(self, obj):
        if self.current_day:
            branch_open_hours = obj.branchopenhours_set.filter(
                day=self.current_day
            ).first()
            return BranchOpenHoursSerializer(branch_open_hours).data
        else:
            return None

    def get_current_load_level(self, obj):
        if self.current_time and self.current_day:
            try:
                load = obj.branchload_set.get(
                    day=self.current_day,
                    start__lte=self.current_time,
                    end__gte=self.current_time
                )
                if load.load <= 33:
                    return 1
                elif 33 < load.load <= 66:
                    return 2
                else:
                    return 3
            except BranchLoad.DoesNotExist:
                return None
        else:
            return None

    def get_time_in_line(self, obj):
        if self.current_time and self.current_day:
            try:
                load = obj.branchload_set.get(
                    day=self.current_day,
                    start__lte=self.current_time,
                    end__gte=self.current_time
                )
                if load.load <= 33:
                    return "5 - 7 минут"
                elif 33 < load.load <= 66:
                    return "15 - 20 минут"
                else:
                    return "от 30 минут"
            except BranchLoad.DoesNotExist:
                return None
        else:
            return None

    def get_distance(self, obj):
        if self.my_lat and self.my_lon:
            point = Point(float(self.my_lon), float(self.my_lat), srid=4326)
            distance = obj.location.distance(point) * 100
            return distance
        return None

    class Meta:
        model = Branch
        fields = [
            'id', 'name', 'address', 'latitude', 'longitude', 'open_hours',
            'load', 'current_load_level', 'distance', 'time_in_line', 'current_regime', 'operations'
        ]
