"use client";

import React, { useState } from "react";

import { Bell } from "lucide-react";

import { Switch } from "@/shared/ui/switch";

interface UserNotificationsCardProps {
  notifications?: {
    id: string;
    label: string;
    enabled: boolean;
  }[];
  onNotificationChange?: (id: string, enabled: boolean) => void;
}

export default function UserNotificationsCard({
  notifications = [
    {
      id: "1",
      label: "Lorem ipsum dolor sit amet consectetur.",
      enabled: true,
    },
    {
      id: "2",
      label: "Lorem ipsum dolor sit amet consectetur.",
      enabled: false,
    },
    {
      id: "3",
      label: "Lorem ipsum dolor sit amet consectetur.",
      enabled: true,
    },
    {
      id: "4",
      label: "Lorem ipsum dolor sit amet consectetur.",
      enabled: true,
    },
  ],
  onNotificationChange,
}: UserNotificationsCardProps) {
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const handleNotificationChange = (id: string, enabled: boolean) => {
    setLocalNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, enabled } : notification
      )
    );
    if (onNotificationChange) {
      onNotificationChange(id, enabled);
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-6 w-full">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        {/* Bell Icon */}
        <div className="w-8 h-8 bg-[#3A4754] rounded-lg flex items-center justify-center">
          <Bell className="h-4 w-4 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#3A4754]">Сповіщення</h3>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 w-full">
        {localNotifications.map(notification => (
          <div key={notification.id} className="flex items-center gap-3">
            <Switch
              checked={notification.enabled}
              onCheckedChange={checked =>
                handleNotificationChange(notification.id, checked)
              }
              className=""
            />
            <span className="text-sm text-[#3A4754] flex-1">
              {notification.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
