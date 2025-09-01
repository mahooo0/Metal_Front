"use client";

import { memo } from "react";

import type { Card } from "../types";

interface UserAvatarsProps {
  card: Card;
}

export default memo(function UserAvatars({ card }: UserAvatarsProps) {
  if (!card.assignedUsers || card.assignedUsers.length === 0) {
    return null;
  }

  return (
    <div className="flex space-x-2 mt-2">
      {card.assignedUsers.map((user, index) => (
        <div
          key={user.id}
          className="rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white"
          title={user.name}>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-[36px] h-[36px] rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
});
