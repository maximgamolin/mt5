import json
from datetime import datetime
from django.core.management.base import BaseCommand

from branch.models import Branch, Service, BranchService, BranchOpenHours


class Command(BaseCommand):
    help = "Populate models from a JSON file"

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help="Path to the JSON file")

    def _parse_days(self, days):
        if ',' in days:
            result = days.split(',')
        elif '-' in days:
            start_day, end_day = days.split('-')
            start_index = BranchOpenHours.DAY_CHOICES.index((start_day, start_day))
            end_index = BranchOpenHours.DAY_CHOICES.index((end_day, end_day))
            result = [day[0] for day in BranchOpenHours.DAY_CHOICES[start_index:end_index + 1]]
        else:
            result = [days]
        return result

    def _create_open_hours(self, branch, days, open_hours, for_individuals, for_legals):
        if open_hours['hours'] == "выходной":
            for day in days:
                BranchOpenHours.objects.create(
                    branch=branch,
                    day=day,
                    opening_time=None,
                    closing_time=None,
                    is_holiday=True,
                    for_legals=for_legals,
                    for_individuals=for_individuals,
                )
        else:
            opening_time, closing_time = open_hours['hours'].split('-')
            for day in days:
                if day == 'перерыв':
                    BranchOpenHours.objects.create(
                        branch=branch,
                        day=None,
                        opening_time=datetime.strptime(opening_time.strip(), '%H:%M').time(),
                        closing_time=datetime.strptime(closing_time.strip(), '%H:%M').time(),
                        for_legals=for_legals,
                        for_individuals=for_individuals,
                        is_break=True,
                    )
                else:
                    BranchOpenHours.objects.create(
                        branch=branch,
                        day=day,
                        opening_time=datetime.strptime(opening_time.strip(), '%H:%M').time(),
                        closing_time=datetime.strptime(closing_time.strip(), '%H:%M').time(),
                        for_legals=for_legals,
                        for_individuals=for_individuals,
                    )

    def handle(self, *args, **kwargs):
        json_file_path = kwargs['json_file']

        with open(json_file_path, 'r') as file:
            data = json.load(file)

            for item in data:
                print(item['salePointName'])
                branch = Branch.objects.create(
                    name=item['salePointName'],
                    address=item['address'],
                    latitude=item['latitude'],
                    longitude=item['longitude'],
                    working_whole_day=item['allDay']
                )

                for service_key, service_data in item['services'].items():
                    service, _ = Service.objects.get_or_create(name=service_key)

                    BranchService.objects.create(
                        branch=branch,
                        service=service,
                        activity=service_data['serviceActivity'],
                        capability=service_data['serviceCapability']
                    )

                for open_hours in item['openHours']:
                    if open_hours['days'] == 'Не обслуживает ЮЛ':
                        continue
                    days = self._parse_days(open_hours['days'])
                    self._create_open_hours(branch, days, open_hours, for_individuals=False, for_legals=True)

                for open_hours in item['openHoursIndividual']:
                    if open_hours['days'] == 'Не обслуживает ФЛ':
                        continue
                    days = self._parse_days(open_hours['days'])
                    self._create_open_hours(branch, days, open_hours, for_individuals=True, for_legals=False)

        self.stdout.write(self.style.SUCCESS("Successfully populated models from the JSON file"))
