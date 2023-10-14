from rest_framework import serializers

from .models import ATMService, Service, ATM


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ATMServiceSerializer(serializers.ModelSerializer):
    service = ServiceSerializer()

    class Meta:
        model = ATMService
        fields = '__all__'


class ATMSerializer(serializers.ModelSerializer):
    services = ATMServiceSerializer(source='atmservice_set', many=True)

    class Meta:
        model = ATM
        exclude = ('location',)


class GeoJsonATMSerializer(serializers.BaseSerializer):

    def to_representation(self, instance: ATM):
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [instance.longitude, instance.latitude]
            },
            "properties": {
                "address": instance.address,
                'id': instance.id
            }
        }
