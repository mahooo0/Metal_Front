export const TABLE_STATUS_CONFIG = {
  planning: {
    label: "Планування",
    color: "bg-purple-100 text-purple-800",
  },
  "in-progress": {
    label: "У процесі",
    color: "bg-green-100 text-green-800",
  },
  calculation: {
    label: "Прорахунок",
    color: "bg-blue-100 text-blue-800",
  },
  "under-review": {
    label: "На розгляді",
    color: "bg-blue-100 text-blue-800",
  },
  launch: {
    label: "Запуск",
    color: "bg-blue-100 text-blue-800",
  },
  pause: {
    label: "Пауза",
    color: "bg-orange-100 text-orange-800",
  },
} as const;
