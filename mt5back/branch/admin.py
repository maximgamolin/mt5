from django.contrib import admin
from .models import Branch, Service, BranchService, BranchOpenHours


class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude', 'working_whole_day')
    list_filter = ('working_whole_day',)
    search_fields = ('address',)


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class BranchServiceAdmin(admin.ModelAdmin):
    list_display = ('branch', 'service', 'activity', 'capability')
    list_filter = ('activity', 'capability')
    search_fields = ('branch__address', 'branch__name', 'service__name')


class BranchOpenHoursAdmin(admin.ModelAdmin):
    list_display = ('day', 'opening_time', 'closing_time')
    list_editable = ('opening_time', 'closing_time')
    ordering = ('day',)


admin.site.register(BranchOpenHours, BranchOpenHoursAdmin)
admin.site.register(BranchService, BranchServiceAdmin)
admin.site.register(Branch, BranchAdmin)
admin.site.register(Service, ServiceAdmin)

