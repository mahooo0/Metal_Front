"use client";

import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { useDndSensors, useKanbanBoard } from "../hooks";
import { createMockOrders } from "../mocks";
import CardItem from "./cardItem";
import Column from "./column";

export default function KanbanBoard() {
  const sensors = useDndSensors();
  const {
    state,
    active,
    columnIds,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanBoard(createMockOrders());

  return (
    <div className="w-full h-full bg-[#FCFCFC] p-6 rounded-2xl">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        {/* Columns row */}
        <SortableContext
          items={columnIds}
          strategy={horizontalListSortingStrategy}>
          <div className="grid auto-cols-[minmax(280px,1fr)] gap-y-4 grid-flow-col gap-4 overflow-x-auto pb-4">
            {state.columns.map(col => (
              <Column
                key={col.id}
                column={col}
                cards={state.cardsByColumn[col.id] || []}
              />
            ))}
          </div>
        </SortableContext>

        {/* Ghost */}
        {createPortal(
          <DragOverlay>
            {active?.type === "card" && (
              <CardItem card={active.card} isOverlay />
            )}
            {active?.type === "column" && (
              <div className="w-[320px]">
                <div className="rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                  <div className="px-4 py-3 border-b text-sm font-medium">
                    {active.column.title}
                  </div>
                  <div className="p-4 text-sm text-gray-500">Перетягніть…</div>
                </div>
              </div>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
