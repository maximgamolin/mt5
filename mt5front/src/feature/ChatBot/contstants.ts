export const MESSAGES = [
  "Привет!  Это бот компании ВТБ, эксперт по поиску идельного места встречи в одном из наших отделений! Чем могу быть полезен?",
];

export const AVAILABLE_OPERATIONS = [
  { slug: "obmen-valyuty", name: "Обмен валюты" },
  { slug: "ipoteka", name: "Ипотека" },
  { slug: "strahovanie-avtomobiley", name: "Страхование автомобилей" },
  {
    slug: "vklady-v-dragocennye-metally",
    name: "Вклады в драгоценные металлы",
  },
  { slug: "bankovskie-karty", name: "Различные виды банковских карт" },
] as const;
