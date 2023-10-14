export interface OpenHours {
  days: string;
  hours: string | null;
}

export type Regime = {
  id: number;
  day?: Day;
  opening_time?: string;
  closing_time?: string;
  is_holiday?: boolean;
  for_individuals?: boolean;
  for_legals?: boolean;
  is_break?: boolean;
};
export type OfficeStatus = {
  is_open: boolean;
  msg: string;
};
export type TimeInLine = "5 - 7 минут" | "15 - 20 минут" | "от 30 минут";

export interface Branch {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  current_load_level?: 1 | 2 | 3;
  distance?: number;
  time_in_line?: TimeInLine;
  current_regime?: Regime;
  when_opened?: OfficeStatus;
  croud_tendency?: {
    tendency: string;
    msg: string;
    symbol: string;
  };
}

export interface BranchDataOut {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  current_load_level?: 1 | 2 | 3;
  distance?: number;
  time_in_line?: TimeInLine;
  current_regime?: Regime;
  when_opened?: OfficeStatus;
  croud_tendency?: {
    tendency: string;
    msg: string;
    symbol: string;
  };
  load?: BranchLoad[];
  operations?: BranchOperation[];
}

export enum Day {
  Monday = "пн",
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

export interface BranchLoad {
  id: number;
  branch: number;
  day: Day;
  load: number;
  start: string;
  end: string;
}

export interface BranchOperation {
  id: number;
  name: string;
  slug: string;
}
