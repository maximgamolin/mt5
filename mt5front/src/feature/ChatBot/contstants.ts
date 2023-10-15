import { BankingOperation } from "../../API/types";

export const MESSAGES = [
  "Привет!  Это бот компании ВТБ, эксперт по поиску идельного места встречи в одном из наших отделений! Чем могу быть полезен?",
  "Выберите интересующую вас услугу:",
  "Ищем отделения...",
  "Отлично! Удалось подобрать несколько вариантов:",
];

export const AVAILABLE_OPERATIONS = [
  { slug: BankingOperation.MoneyExchange, name: "Обмен валюты" },
  { slug: BankingOperation.Morgage, name: "Ипотека" },
  { slug: BankingOperation.CarInsurance, name: "Страхование автомобилей" },
  {
    slug: BankingOperation.CarInsurance,
    name: "Вклады в драгоценные металлы",
  },
  { slug: BankingOperation.BankCard, name: "Различные виды банковских карт" },
] as const;

export const POSSIBLE_USER_REQUESTS = [
  "Электронная очередь",
  "Выбрать услугу",
  "Ближайший банкомат",
  "Услуги онлайн",
  "Услуги для юридических лиц",
  "Другое",
] as const;
