"use client";

import { memo } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisIcon } from "lucide-react";

import { cn } from "@/shared/lib";

import { ORDER_STATUS_COLORS, ORDER_STATUS_COLORS_TEXT } from "../constants";
import type { ColumnT } from "../types";

interface ColumnHeaderProps {
  column: ColumnT;
  cardsCount: number;
}

export default memo(function ColumnHeader({
  column,
  cardsCount,
}: ColumnHeaderProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "column" },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center  justify-between px-4 py-3 text-sm font-medium cursor-grab active:cursor-grabbing rounded-t-xl ${isDragging ? "opacity-70" : ""}`}
      {...attributes}
      {...listeners}>
      <div className="flex items-center border-b border-[#C8CDD2] pb-4 justify-between w-full">
        <div
          className={cn(
            "rounded-full py-2 px-3 ",
            ORDER_STATUS_COLORS[column.id as keyof typeof ORDER_STATUS_COLORS]
          )}>
          <p
            className={cn(
              "text-xs font-medium",
              ORDER_STATUS_COLORS_TEXT[
                column.id as keyof typeof ORDER_STATUS_COLORS_TEXT
              ]
            )}>
            {column.title}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <EllipsisIcon />
        </div>
      </div>
    </div>
  );
});
