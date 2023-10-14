export interface OpenHours {
  days: string;
  hours: string | null;
}

export interface Office {
  salePointName: string;
  address: string;
  status: string;
  openHours: OpenHours[];
  rko: string | null;
  openHoursIndividual: OpenHours[];
  officeType: string;
  salePointFormat: string;
  suoAvailability: null | string;
  hasRamp: null | string;
  latitude: number;
  longitude: number;
  metroStation: null | string;
  distance: number;
  kep: null | boolean;
  myBranch: boolean;
}
