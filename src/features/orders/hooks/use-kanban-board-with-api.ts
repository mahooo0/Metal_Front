import { useCallback, useMemo, useState } from "react";

import { useUpdateOrderStatus } from "@/hooks/use-update-order-status";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { useOrdersKanbanStore } from "../stores/orders-kanban-store";
import type { ActiveDrag, BoardState, Card } from "../types";
import { OrderRequestStatus } from "../types/order-request.types";
import { findColumnIdByCardId } from "../utils";
import { mapOrderRequestToCard } from "../utils/map-order-request-to-card";

// Маппинг статусов колонок на API статусы
const COLUMN_TO_STATUS_MAP: Record<string, OrderRequestStatus> = {
  new: "NEW_ORDER",
  calculation: "CALCULATION",
  clarify: "CLARIFICATION",
  extra: "EXTRA_SERVICES",
};

// Обратный маппинг
const STATUS_TO_COLUMN_MAP: Record<OrderRequestStatus, string> = {
  NEW_ORDER: "new",
  CALCULATION: "calculation",
  CLARIFICATION: "clarify",
  EXTRA_SERVICES: "extra",
};

export const useKanbanBoardWithApi = () => {
  const { ordersByStatus, moveOrder } = useOrdersKanbanStore();
  const updateStatusMutation = useUpdateOrderStatus();
  const [active, setActive] = useState<ActiveDrag>(null);

  // Преобразуем данные из store в BoardState
  const state: BoardState = useMemo(() => {
    const columns = [
      { id: "new", title: "Нові замовлення" },
      { id: "calculation", title: "Прорахунок" },
      { id: "clarify", title: "Уточнення" },
      { id: "extra", title: "Додаткові послуги" },
    ];

    const cardsByColumn: Record<string, Card[]> = {};

    Object.entries(ordersByStatus).forEach(([status, orders]) => {
      const columnId = STATUS_TO_COLUMN_MAP[status as OrderRequestStatus];
      if (columnId) {
        cardsByColumn[columnId] = orders.map(mapOrderRequestToCard);
      }
    });

    return { columns, cardsByColumn };
  }, [ordersByStatus]);

  const columnIds = useMemo(
    () => state.columns.map(c => c.id),
    [state.columns]
  );

  const handleDragStart = useCallback(
    (e: DragStartEvent) => {
      const { id, data } = e.active;
      const type = data.current?.type as "column" | "card";

      if (type === "column") {
        const column = state.columns.find(c => c.id === id);
        if (column) setActive({ type: "column", column });
      } else if (type === "card") {
        const fromColumnId = findColumnIdByCardId(
          String(id),
          state.cardsByColumn
        );
        if (!fromColumnId) return;
        const card =
          state.cardsByColumn[fromColumnId].find(c => c.id === id) ?? null;
        if (card) setActive({ type: "card", card, fromColumnId });
      }
    },
    [state]
  );

  const handleDragOver = useCallback(
    (e: DragOverEvent) => {
      const { active, over } = e;
      if (!over) return;

      const activeType = active.data.current?.type as
        | "column"
        | "card"
        | undefined;
      const overType = over.data.current?.type as "column" | "card" | undefined;

      // В handleDragOver только визуальное перемещение, реальное обновление в handleDragEnd
      if (activeType === "card") {
        const activeCol = findColumnIdByCardId(
          String(active.id),
          state.cardsByColumn
        );
        const overCol =
          (overType === "column" && String(over.id)) ||
          (overType === "card" &&
            findColumnIdByCardId(String(over.id), state.cardsByColumn));

        if (!activeCol || !overCol || activeCol === overCol) return;
        // Визуальное перемещение обрабатывается DnD Kit автоматически
      }
    },
    [state]
  );

  const handleDragEnd = useCallback(
    async (e: DragEndEvent) => {
      const { active, over } = e;
      if (!over) {
        setActive(null);
        return;
      }

      const activeType = active.data.current?.type as "column" | "card";
      const overType = over.data.current?.type as "column" | "card";

      if (activeType === "column" && overType === "column") {
        if (active.id !== over.id) {
          // Перемещение колонок - не реализовано для API
        }
      }

      if (activeType === "card") {
        const fromId = findColumnIdByCardId(
          String(active.id),
          state.cardsByColumn
        );
        const toId =
          (overType === "column" && String(over.id)) ||
          (overType === "card" &&
            findColumnIdByCardId(String(over.id), state.cardsByColumn));

        if (!fromId || !toId) {
          setActive(null);
          return;
        }

        const fromStatus = COLUMN_TO_STATUS_MAP[fromId];
        const toStatus = COLUMN_TO_STATUS_MAP[toId];

        if (!fromStatus || !toStatus || fromStatus === toStatus) {
          setActive(null);
          return;
        }

        // Определяем позицию для вставки
        const toCards = state.cardsByColumn[toId] || [];
        let insertIndex = toCards.length; // По умолчанию в конец

        if (overType === "card") {
          // Если перетаскиваем на карточку, вставляем перед ней
          const overCardIndex = toCards.findIndex(
            c => c.id === String(over.id)
          );
          if (overCardIndex !== -1) {
            insertIndex = overCardIndex;
          }
        }

        // Сохраняем старое состояние для отката
        const fromCards = state.cardsByColumn[fromId] || [];
        const originalIndex = fromCards.findIndex(
          c => c.id === String(active.id)
        );
        const previousState = {
          fromStatus,
          toStatus,
          orderId: String(active.id),
          originalIndex,
        };

        // Optimistic update - сразу обновляем в store с указанием позиции
        moveOrder(String(active.id), fromStatus, toStatus, insertIndex);

        // Отправляем запрос на сервер
        try {
          await updateStatusMutation.mutateAsync({
            id: String(active.id),
            status: toStatus,
          });
          // При успехе данные уже обновлены через invalidateQueries
        } catch (error) {
          // При ошибке откатываем изменения (возвращаем в исходную колонку и позицию)
          moveOrder(
            previousState.orderId,
            previousState.toStatus,
            previousState.fromStatus,
            previousState.originalIndex
          );
        }
      }

      setActive(null);
    },
    [state, updateStatusMutation, moveOrder]
  );

  return {
    state,
    active,
    columnIds,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    isLoading: updateStatusMutation.isPending,
  };
};
