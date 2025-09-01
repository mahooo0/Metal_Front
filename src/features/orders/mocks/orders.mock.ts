import neqr_s_ockami from "@/public/neqr_s_ockami.png";
import { nanoid } from "nanoid";

import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "../constants";
import type { BoardState } from "../types";

export const createMockOrders = (): BoardState => {
  const columns = [
    { id: ORDER_STATUSES.NEW, title: ORDER_STATUS_LABELS[ORDER_STATUSES.NEW] },
    {
      id: ORDER_STATUSES.CALCULATION,
      title: ORDER_STATUS_LABELS[ORDER_STATUSES.CALCULATION],
    },
    {
      id: ORDER_STATUSES.CLARIFY,
      title: ORDER_STATUS_LABELS[ORDER_STATUSES.CLARIFY],
    },
    {
      id: ORDER_STATUSES.EXTRA,
      title: ORDER_STATUS_LABELS[ORDER_STATUSES.EXTRA],
    },
    { id: ORDER_STATUSES.KP, title: ORDER_STATUS_LABELS[ORDER_STATUSES.KP] },
  ];

  const createMockCards = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => {
      // Создаем разнообразие в карточках
      const hasUsers = i > 0; // Первая карточка без пользователей
      const hasCreatedAt = i > 0; // Первая карточка без даты создания
      const hasCompletedAt = i > 2; // Только последние 2 карточки имеют дату завершения

      return {
        id: nanoid(6),
        title: `${prefix} #${i + 1}`,
        subtitle: 'ТОВ "Нові технології"',
        companyName: 'ТОВ "Нові технології"',
        orderId: "45776890690",
        createdAt: hasCreatedAt ? "2017-08-15" : undefined,
        completedAt: hasCompletedAt ? "2017-10-15" : undefined,
        assignedUsers: hasUsers
          ? i === 1
            ? [
                // Вторая карточка только с одним пользователем
                {
                  id: "1",
                  name: "Чоловік",
                  avatar: neqr_s_ockami.src,
                },
              ]
            : [
                // Остальные карточки с двумя пользователями
                {
                  id: "1",
                  name: "Чоловік",
                  avatar: neqr_s_ockami.src,
                },
                {
                  id: "2",
                  name: "Жінка",
                  avatar: neqr_s_ockami.src,
                },
              ]
          : undefined,
      };
    });

  return {
    columns,
    cardsByColumn: {
      [ORDER_STATUSES.NEW]: createMockCards("Нове", 5),
      [ORDER_STATUSES.CALCULATION]: createMockCards("Прорахунок", 5),
      [ORDER_STATUSES.CLARIFY]: createMockCards("Уточнити", 5),
      [ORDER_STATUSES.EXTRA]: createMockCards("Дод. послуга", 5),
      [ORDER_STATUSES.KP]: createMockCards("КП", 5),
    },
  };
};
