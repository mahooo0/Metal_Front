export type CalendarView = "month" | "week" | "day" | "agenda" | "list";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: EventColor;
  location?: string;
}

export type EventColor =
  | "blue"
  | "purple"
  | "green"
  | "violet"
  | "cyan"
  | "orange"
  // Legacy colors for backward compatibility
  | "sky"
  | "amber"
  | "rose"
  | "emerald";

export * from "./order.types";
