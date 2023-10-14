from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point
from django.db import models


class ATM(models.Model):
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    location = gis_models.PointField(null=True, blank=True)
    all_day = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.location = Point(self.longitude, self.latitude)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.address


class Service(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ATMService(models.Model):
    ACTIVITY_CHOICES = [
        ("UNAVAILABLE", "Unavailable"),
        ("UNKNOWN", "Unknown"),
        ("AVAILABLE", "Available"),
    ]

    CAPABILITY_CHOICES = [
        ("UNSUPPORTED", "Unsupported"),
        ("UNKNOWN", "Unknown"),
        ("SUPPORTED", "Supported"),
    ]

    atm = models.ForeignKey(ATM, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    activity = models.CharField(max_length=11, choices=ACTIVITY_CHOICES)
    capability = models.CharField(max_length=11, choices=CAPABILITY_CHOICES)

    def __str__(self):
        return f'{self.atm} - {self.service}'

