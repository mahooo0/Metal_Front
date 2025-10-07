import { Locale, format } from "date-fns";
import { uk } from "date-fns/locale";

// Ukrainian month names
export const ukrainianMonths = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

// Ukrainian short month names
export const ukrainianShortMonths = [
  "Січ",
  "Лют",
  "Бер",
  "Кві",
  "Тра",
  "Чер",
  "Лип",
  "Сер",
  "Вер",
  "Жов",
  "Лис",
  "Гру",
];

// Ukrainian day names
export const ukrainianDays = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];

// Ukrainian short day names
export const ukrainianShortDays = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

// Ukrainian very short day names
export const ukrainianVeryShortDays = ["Н", "П", "В", "С", "Ч", "П", "С"];

// Custom Ukrainian locale for date-fns
export const ukrainianLocale: Locale = {
  ...uk,
  localize: {
    ...uk.localize,
    month: (month, options) => {
      if (options?.width === "abbreviated") {
        return ukrainianShortMonths[month];
      }
      return ukrainianMonths[month];
    },
    day: (day, options) => {
      if (options?.width === "abbreviated") {
        return ukrainianShortDays[day];
      }
      if (options?.width === "narrow") {
        return ukrainianVeryShortDays[day];
      }
      return ukrainianDays[day];
    },
  },
};

// Helper function to format dates in Ukrainian
export function formatUkrainian(date: Date, formatStr: string): string {
  return format(date, formatStr, { locale: ukrainianLocale });
}

// Helper function to get Ukrainian month name
export function getUkrainianMonthName(
  monthIndex: number,
  short = false
): string {
  return short ? ukrainianShortMonths[monthIndex] : ukrainianMonths[monthIndex];
}

// Helper function to get Ukrainian day name
export function getUkrainianDayName(dayIndex: number, short = false): string {
  return short ? ukrainianShortDays[dayIndex] : ukrainianDays[dayIndex];
}
