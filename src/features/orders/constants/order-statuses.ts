export const ORDER_STATUSES = {
  NEW: "new",
  CALCULATION: "calculation",
  CLARIFY: "clarify",
  EXTRA: "extra",
  KP: "kp",
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUSES.NEW]: "Нові замовлення",
  [ORDER_STATUSES.CALCULATION]: "Прорахунок",
  [ORDER_STATUSES.CLARIFY]: "Уточнення",
  [ORDER_STATUSES.EXTRA]: "Додаткові послуги",
  [ORDER_STATUSES.KP]: "КП створення",
} as const;

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUSES.NEW]: "bg-[#D8F6FE]",
  [ORDER_STATUSES.CALCULATION]: "bg-[#D7F6EE]",
  [ORDER_STATUSES.CLARIFY]: "bg-[#F8D1FC]",
  [ORDER_STATUSES.EXTRA]: "bg-[#D3CEFB]",
  [ORDER_STATUSES.KP]: "bg-[#BBDFFD]",
} as const;

export const ORDER_STATUS_COLORS_TEXT = {
  [ORDER_STATUSES.NEW]: " text-[#30B2D5]",
  [ORDER_STATUSES.CALCULATION]: " text-[#64C4AA]",
  [ORDER_STATUSES.CLARIFY]: " text-[#CE70D8]",
  [ORDER_STATUSES.EXTRA]: " text-[#6C5BF2]",
  [ORDER_STATUSES.KP]: " text-[#1D96F9]",
} as const;
