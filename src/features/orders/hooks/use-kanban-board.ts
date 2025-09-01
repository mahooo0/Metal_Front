import { useMemo, useState } from "react";

import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { ActiveDrag, BoardState, Card } from "../types";
import { findColumnIdByCardId } from "../utils";

export const useKanbanBoard = (initialState: BoardState) => {
  const [state, setState] = useState<BoardState>(initialState);
  const [active, setActive] = useState<ActiveDrag>(null);

  const columnIds = useMemo(
    () => state.columns.map(c => c.id),
    [state.columns]
  );

  const handleDragStart = (e: DragStartEvent) => {
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
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeType = active.data.current?.type as
      | "column"
      | "card"
      | undefined;
    const overType = over.data.current?.type as "column" | "card" | undefined;

    // Only handle card -> column/card cross moves here to feel snappier
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

      setState(prev => {
        const activeCards = [...prev.cardsByColumn[activeCol]];
        const overCards = [...prev.cardsByColumn[overCol]];
        const movingIdx = activeCards.findIndex(c => c.id === active.id);
        if (movingIdx === -1) return prev;

        const moving = activeCards.splice(movingIdx, 1)[0];
        // drop to end by default; fine-tuned placement happens on dragEnd
        overCards.push(moving);

        return {
          ...prev,
          cardsByColumn: {
            ...prev.cardsByColumn,
            [activeCol]: activeCards,
            [overCol]: overCards,
          },
        };
      });
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      setActive(null);
      return;
    }

    const activeType = active.data.current?.type as "column" | "card";
    const overType = over.data.current?.type as "column" | "card";

    if (activeType === "column" && overType === "column") {
      if (active.id !== over.id) {
        setState(prev => ({
          ...prev,
          columns: arrayMove(
            prev.columns,
            prev.columns.findIndex(c => c.id === active.id),
            prev.columns.findIndex(c => c.id === over.id)
          ),
        }));
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

      setState(prev => {
        const next = { ...prev, cardsByColumn: { ...prev.cardsByColumn } };
        const from = [...next.cardsByColumn[fromId]];
        const to = fromId === toId ? from : [...next.cardsByColumn[toId]];

        const fromIdx = from.findIndex(c => c.id === active.id);
        const overIdx =
          overType === "card" ? to.findIndex(c => c.id === over.id) : to.length;

        const moving = from.splice(fromIdx, 1)[0];
        const finalIdx = overType === "card" ? overIdx : to.length;
        to.splice(finalIdx, 0, moving);

        next.cardsByColumn[fromId] = from;
        next.cardsByColumn[toId] = to;

        return next;
      });
    }

    setActive(null);
  };

  return {
    state,
    active,
    columnIds,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
