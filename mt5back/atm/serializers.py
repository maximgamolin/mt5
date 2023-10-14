from rest_framework import serializers

from .models import ATMService, Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name']


class ATMServiceSerializer(serializers.ModelSerializer):
    service = ServiceSerializer()

    class Meta:
        model = ATMService
        fields = ['id', 'service', 'activity', 'capability']

