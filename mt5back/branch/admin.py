from django.contrib import admin

from .models import Branch, BranchOpenHours, BranchLoad


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude')
    search_fields = ('address',)


@admin.register(BranchOpenHours)
class BranchOpenHoursAdmin(admin.ModelAdmin):
    list_display = ('day', 'opening_time', 'closing_time')
    list_editable = ('opening_time', 'closing_time')
    ordering = ('day',)


@admin.register(BranchLoad)
class BranchLoadAdmin(admin.ModelAdmin):
    list_display = ('branch', 'day', 'load', 'start', 'end')
    list_filter = ('branch', 'day', 'load')
    search_fields = ('branch__name', 'day', 'load')
    ordering = ('branch', 'day', 'start')

    fieldsets = (
        (None, {
            'fields': ('branch', 'day', 'load', 'start', 'end')
        }),
    )