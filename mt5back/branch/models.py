from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point
from django.db import models

from .consts import INTERVALS_WITH_ALIAS_15m, INTERVALS_WITH_ALIAS_1h

DAY_CHOICES = [
        ('пн', 'пн'),
        ('вт', 'вт'),
        ('ср', 'ср'),
        ('чт', 'чт'),
        ('пт', 'пт'),
        ('сб', 'сб'),
        ('вс', 'вс'),
    ]


class Branch(models.Model):

    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    location = gis_models.PointField(srid=4326, null=True, blank=True)
    rko = models.BooleanField(default=False)
    has_ramp = models.BooleanField(default=False)
    office_type = models.CharField(max_length=255)
    sale_point_format = models.CharField(max_length=255)
    suo_availability = models.BooleanField(default=False)
    kep = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.location = Point(self.longitude, self.latitude)
        return super(Branch, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class BranchOpenHours(models.Model):

    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    day = models.CharField(max_length=2, choices=DAY_CHOICES, null=True, blank=True)
    opening_time = models.TimeField(choices=((v[0], k) for k, v in INTERVALS_WITH_ALIAS_15m.items()), null=True, blank=True)
    closing_time = models.TimeField(choices=((v[1], k) for k, v in INTERVALS_WITH_ALIAS_15m.items()), null=True, blank=True)
    is_holiday = models.BooleanField(default=False)
    for_individuals = models.BooleanField(default=False)
    for_legals = models.BooleanField(default=False)
    is_break = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.branch} {self.day}: {self.opening_time} - {self.closing_time}'


class BranchLoad(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    day = models.CharField(max_length=2, choices=DAY_CHOICES, null=True, blank=True)
    load = models.PositiveSmallIntegerField()
    start = models.TimeField(choices=((v[0], k) for k, v in INTERVALS_WITH_ALIAS_1h.items()), null=True, blank=True)
    end = models.TimeField(choices=((v[1], k) for k, v in INTERVALS_WITH_ALIAS_1h.items()), null=True, blank=True)

    def __str__(self):
        return f'{self.branch} {self.day}: {self.load}'

