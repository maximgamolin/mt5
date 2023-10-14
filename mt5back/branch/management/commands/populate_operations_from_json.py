import json
from random import randrange

from django.core.management.base import BaseCommand, CommandError

from branch.models import Operations, Branch, BranchOperations


class Command(BaseCommand):
    help = 'Load operations data from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help="Path to the JSON file")

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']

        try:
            with open(file_path, 'r') as file:
                data = json.load(file)

                for item in data:
                    print(f"Loading operation: {item['name']}")
                    Operations.objects.create(slug=item['slug'], name=item['name'])

                for branch in Branch.objects.all():
                    operations = Operations.objects.order_by('?')[:randrange(3, 6)]
                    for operation in operations:
                        print(f"Branch: {branch}, operation: {operation}")
                        BranchOperations.objects.create(branch=branch, operations=operation)

                self.stdout.write(self.style.SUCCESS(f"Successfully loaded operations from {file_path}"))

        except Exception as e:
            raise CommandError(f"Error occurred: {e}")
