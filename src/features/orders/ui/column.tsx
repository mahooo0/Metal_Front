"use client";

import { memo } from "react";

import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Card, ColumnT } from "../types";
import CardItem from "./cardItem";
import ColumnHeader from "./column-header";

function ColumnShell({ children }: { children: React.ReactNode }) {
  return <div className="flex h-fit min-h-[120px]  flex-col">{children}</div>;
}

function DroppableCardList({
  id,
  children,
}: {
  id: UniqueIdentifier;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "column" },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-3 p-3 transition-colors ${
        isOver ? "bg-blue-50/60" : ""
      }`}>
      {children}
    </div>
  );
}

export default memo(function Column({
  column,
  cards,
}: {
  column: ColumnT;
  cards: Card[];
}) {
  const items = cards.map(c => c.id);

  return (
    <ColumnShell>
      <ColumnHeader column={column} cardsCount={0} />
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <DroppableCardList id={column.id}>
          {cards.map(card => (
            <CardItem key={card.id} card={card} />
          ))}
        </DroppableCardList>
      </SortableContext>
    </ColumnShell>
  );
});
