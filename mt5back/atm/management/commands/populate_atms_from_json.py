import json

from django.core.management.base import BaseCommand

from atm.models import ATM, Service, ATMService


class Command(BaseCommand):
    help = 'Import ATMs from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to the JSON file containing ATMs data')

    def handle(self, *args, **kwargs):
        json_file_path = kwargs['json_file']

        with open(json_file_path, 'r') as file:
            data = json.load(file)

        for atm_data in data["atms"]:
            print(atm_data['address'])
            atm = ATM(
                address=atm_data['address'],
                latitude=atm_data['latitude'],
                longitude=atm_data['longitude'],
                all_day=atm_data['allDay']
            )
            atm.save()
            for service_key, service_data in atm_data['services'].items():
                service, _ = Service.objects.get_or_create(name=service_key)

                ATMService.objects.create(
                    atm=atm,
                    service=service,
                    activity=service_data['serviceActivity'],
                    capability=service_data['serviceCapability']
                )

        self.stdout.write(self.style.SUCCESS('Successfully imported ATMs from JSON'))