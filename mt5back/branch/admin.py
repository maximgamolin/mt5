from django.contrib import admin

from .models import Branch, BranchOpenHours


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude')
    search_fields = ('address',)


@admin.register(BranchOpenHours)
class BranchOpenHoursAdmin(admin.ModelAdmin):
    list_display = ('day', 'opening_time', 'closing_time')
    list_editable = ('opening_time', 'closing_time')
    ordering = ('day',)
