"use client";

import React, { useState } from "react";

import { Pencil, SquarePenIcon, User } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";

interface UserRolesCardProps {
  roles?: {
    id: string;
    name: string;
    checked: boolean;
  }[];
  onEditRoles?: () => void;
  onRoleChange?: (roleId: string, checked: boolean) => void;
}

export default function UserRolesCard({
  roles = [{ id: "1", name: "Адміністратор", checked: true }],
  onEditRoles,
  onRoleChange,
}: UserRolesCardProps) {
  const [localRoles, setLocalRoles] = useState(roles);

  const handleRoleChange = (roleId: string, checked: boolean) => {
    setLocalRoles(prev =>
      prev.map(role => (role.id === roleId ? { ...role, checked } : role))
    );
    if (onRoleChange) {
      onRoleChange(roleId, checked);
    }
  };

  const handleEditRoles = () => {
    if (onEditRoles) {
      onEditRoles();
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-6 w-full flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 ">
        <div className="flex items-center gap-3">
          {/* User Icon */}
          <div className="relative">
            <div className="w-8 h-8 bg-[#3A4754] rounded-lg flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#3A4754]"></div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#3A4754]">Ролі</h3>
        </div>

        {/* Edit Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEditRoles}
          className="h-8 w-8 rounded-full hover:bg-gray-100 border border-[#E0E0E0]">
          <SquarePenIcon className="h-4 w-4 text-[#3A4754]" />
        </Button>
      </div>

      {/* Roles List */}
      <div className="">
        {localRoles.map(role => (
          <div key={role.id} className="flex items-center gap-3">
            <Checkbox
              id={role.id}
              checked={role.checked}
              disabled={true}
              onCheckedChange={checked =>
                handleRoleChange(role.id, checked as boolean)
              }
            />
            <label
              htmlFor={role.id}
              className="text-sm font-medium text-[#3A4754] cursor-pointer">
              {role.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
