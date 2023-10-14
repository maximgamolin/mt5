from rest_framework import serializers

from .models import Branch, BranchOpenHours, BranchLoad


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
    class Meta:
        model = Branch
        fields = ['id', 'name', 'address', 'latitude', 'longitude']


class BranchOpenHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchOpenHours
        fields = [
            'id', 'day', 'opening_time', 'closing_time', 'is_holiday',
            'for_individuals', 'for_legals', 'is_break'
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
    load = BranchLoadSerializer(
        source='branchload_set', many=True
    )

    class Meta:
        model = Branch
        fields = [
            'id', 'name', 'address', 'latitude', 'longitude', 'open_hours', 'load'
        ]
