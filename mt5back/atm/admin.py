from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

from .models import ATM, Service, ATMService


@admin.register(ATM)
class ATMAdmin(OSMGeoAdmin):
    list_display = ['address', 'latitude', 'longitude', 'all_day']
    list_filter = ('all_day',)
    search_fields = ['address']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(ATMService)
class BranchServiceAdmin(admin.ModelAdmin):
    list_display = ('atm', 'service', 'activity', 'capability')
    list_filter = ('activity', 'capability', )
    search_fields = ('atm__address', 'service__name')
