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

enum Day {
  monday = "пн",
  Tuesday = "вт",
  Wednesday = "ср",
  Thursday = "чт",
  Friday = "пт",
  Saturday = "сб",
  Sunday = "вс",
}

type WorkTime = `${number}:${number}`;
// limit - количество записей на странице
// offset - смещение от начала
// lat - широта
// lon - долгота
// work_day_individuals - рабочий день для ФЛ
// work_day_legals - filter рабочий день для ЮЛ
// works_time_individuals - рабочее время для ФЛ
// works_time_legals - рабочее время для ЮЛ
// only_in_radius - фильтр по радиусу в метрах
export interface GetBranchesParams {
  limit?: number | string;
  offset?: number | string;
  lat?: number;
  lon?: number;
  work_day_individuals?: Day;
  work_day_legals?: Day;
  works_time_individuals?: WorkTime;
  works_time_legals?: WorkTime;
  only_in_radius?: number;
}
