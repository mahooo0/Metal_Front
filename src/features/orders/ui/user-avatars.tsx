"use client";

import { memo } from "react";

import type { Card } from "../types";

interface UserAvatarsProps {
  card: Card;
}

// Функция для получения цвета аватара на основе индекса
const getAvatarColor = (index: number): string => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];
  return colors[index % colors.length];
};

// Функция для получения первой буквы имени
const getInitial = (name: string): string => {
  if (!name) return "?";
  const trimmed = name.trim();
  if (trimmed.length === 0) return "?";
  return trimmed.charAt(0).toUpperCase();
};

export default memo(function UserAvatars({ card }: UserAvatarsProps) {
  if (!card.assignedUsers || card.assignedUsers.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      {card.assignedUsers.map((user, index) => (
        <div key={user.id} className="flex items-center gap-2">
        <div
            className={`w-[36px] h-[36px] rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white ${getAvatarColor(index)}`}
          title={user.name}>
            {getInitial(user.name)}
          </div>
          <span className="text-sm text-[#3A4754] font-medium">
            {user.name}
          </span>
        </div>
      ))}
    </div>
  );
});
