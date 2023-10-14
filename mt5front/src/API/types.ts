export interface OpenHours {
  days: string;
  hours: string | null;
}

export interface Office {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
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

type Time = `${number}:${number}`;
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
  works_time_individuals?: Time;
  works_time_legals?: Time;
  only_in_radius?: number;
}

export interface GetBranchParams {
  id: string;
  lat?: number;
  lon?: number;
  current_day?: Day;
  current_time?: Time;
}
