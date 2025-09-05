"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { CalendarCheckIcon, Clock7Icon } from "lucide-react";

import { useDateFormatting } from "../hooks";
import type { Card } from "../types";
import UserAvatars from "./user-avatars";
import { useRouter } from "next/navigation";

export default function CardItem({
  card,
  isOverlay = false,
}: {
  card: Card;
  isOverlay?: boolean;
}) {
  const { formatMockDate } = useDateFormatting();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: "card" },
    disabled: isOverlay,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const router = useRouter();
  const handleCardClick = (id: string) => {
    router.push(`/dashboard/order/${id}`);
  };
  return (
    <div
    onDoubleClick={() => handleCardClick(card.id)}
      ref={setNodeRef}
      style={style}
      className={clsx(
        "rounded-xl bg-white shadow-sm ring-1 ring-black/5",
        isDragging && "opacity-60",
        isOverlay && "scale-[1.02] shadow-lg"
      )}
      {...attributes}
      {...listeners}>
      <div className="p-4 flex flex-col gap-3">
        {/* User Avatars - показываем только если есть пользователи */}
        {card.assignedUsers && card.assignedUsers.length > 0 && (
          <UserAvatars card={card} />
        )}

        <div className="flex flex-col gap-1">
          <div className="text-base font-bold text-[#3A4754]">
            {card.companyName}
          </div>

          {/* Order ID */}
          <div className="text-sm text-[#929BA5]">ID {card.orderId}</div>
        </div>

        {/* Dates - показываем только если есть даты */}
        {(card.createdAt || card.completedAt) && (
          <div className="mt-3 flex flex-col gap-4 text-xs text-gray-400">
            {card.createdAt && (
              <div className="flex items-center gap-1 justify-between w-full">
                <div className="flex items-center gap-1 justify-between w-fit">
                  <Clock7Icon className="w-4 h-4" />
                  Створено
                </div>
                <p>{formatMockDate(card.createdAt, "15/08/2017")}</p>
              </div>
            )}
            {card.completedAt && (
              <div className="flex items-center gap-1 justify-between w-full">
                <div className="flex items-center gap-1 justify-between w-fit">
                  <CalendarCheckIcon className="w-4 h-4" />
                  Завершення{" "}
                </div>
                <p>{formatMockDate(card.completedAt, "15/10/2017")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
