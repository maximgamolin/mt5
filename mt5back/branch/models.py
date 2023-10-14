from django.db import models
from .consts import INTERVALS_WITH_ALIAS


class Branch(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    working_whole_day = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class BranchService(models.Model):
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

    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    activity = models.CharField(max_length=11, choices=ACTIVITY_CHOICES)
    capability = models.CharField(max_length=11, choices=CAPABILITY_CHOICES)

    def __str__(self):
        return f'{self.branch} - {self.service}'


class BranchOpenHours(models.Model):
    DAY_CHOICES = [
        ('пн', 'пн'),
        ('вт', 'вт'),
        ('ср', 'ср'),
        ('чт', 'чт'),
        ('пт', 'пт'),
        ('сб', 'сб'),
        ('вс', 'вс'),
    ]
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    day = models.CharField(max_length=2, choices=DAY_CHOICES, null=True, blank=True)
    opening_time = models.TimeField(choices=((v[0], k) for k, v in INTERVALS_WITH_ALIAS.items()), null=True, blank=True)
    closing_time = models.TimeField(choices=((v[1], k) for k, v in INTERVALS_WITH_ALIAS.items()), null=True, blank=True)
    is_holiday = models.BooleanField(default=False)
    for_individuals = models.BooleanField(default=False)
    for_legals = models.BooleanField(default=False)
    is_break = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.branch} {self.day}: {self.opening_time} - {self.closing_time}'

