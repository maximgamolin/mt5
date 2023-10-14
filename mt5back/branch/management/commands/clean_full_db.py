from django.core.management.base import BaseCommand

from atm.models import ATM, Service, ATMService
from branch.models import Branch, BranchOpenHours, BranchLoad


class Command(BaseCommand):
    help = 'Clean all data from all models'

    def handle(self, *args, **kwargs):
        Branch.objects.all().delete()
        BranchOpenHours.objects.all().delete()
        BranchLoad.objects.all().delete()
        ATM.objects.all().delete()
        Service.objects.all().delete()
        ATMService.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully cleaned all data'))