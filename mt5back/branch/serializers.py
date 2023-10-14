from rest_framework import serializers

from .models import Branch


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
                "address": instance.address
            }
        }


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'address', 'latitude', 'longitude']
