from random import randint

from django.contrib.gis.geos import Point
from django.core.management.base import BaseCommand

from branch.models import Branch, BranchOpenHours, BranchLoad, DAY_CHOICES, INTERVALS_WITH_ALIAS_1h

CENTER_POINT = Point(37.6208, 55.7540, srid=4326)


def calculate_load(hour, max_load):
    if hour == 18:
        return max_load
    return randint(5, (max_load // 2) + hour)


class Command(BaseCommand):
    help = 'Generate BranchLoad data for each branch and day'

    def handle(self, *args, **kwargs):

        for branch in Branch.objects.all():
            distance_from_center = branch.location.distance(CENTER_POINT) * 100
            max_load = 100 - min(int(distance_from_center), 95)

            for day_choice, _ in DAY_CHOICES:
                open_hours = BranchOpenHours.objects.filter(branch=branch, day=day_choice, for_individuals=True, is_holiday=False).first()
                if open_hours:
                    start_time = open_hours.opening_time.hour
                    end_time = open_hours.closing_time.hour

                    for hour in range(start_time, end_time):
                        print(f'Branch: {branch.name}, Day: {day_choice}, Hour: {hour}')
                        if open_hours.is_break and hour == open_hours.opening_time.hour:
                            load = 0
                        else:
                            load = calculate_load(hour, max_load)
                        end_hour = hour + 1
                        BranchLoad.objects.create(
                            branch=branch,
                            day=day_choice,
                            load=load,
                            start=INTERVALS_WITH_ALIAS_1h[f"T{hour:02}00_{end_hour:02}00"][0],
                            end=INTERVALS_WITH_ALIAS_1h[f"T{hour:02}00_{end_hour:02}00"][1]
                        )

        self.stdout.write(self.style.SUCCESS('Successfully generated BranchLoad data'))
