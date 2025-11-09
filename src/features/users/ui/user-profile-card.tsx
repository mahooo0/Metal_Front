"use client";

import React, { useState } from "react";

import Image from "next/image";

import NeqrVockax from "@/public/neqr_s_ockami.png";
import { MoreHorizontal, Pencil, SquarePenIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface UserProfileCardProps {
  user?: {
    id: string;
    displayName: string;
    firstName: string;
    lastName: string;
    position: string;
    userId: string;
    lastModified?: string;
    comment?: string;
  };
  onEditComment?: () => void;
  onChangePassword?: () => void;
  onMoreActions?: () => void;
  onOpenRestorePassword?: () => void;
}

export default function UserProfileCard({
  user = {
    id: "1",
    displayName: "Albert Flores",
    firstName: "Albert",
    lastName: "Flores",
    position: "Software Engineer",
    userId: "45776890690",
    lastModified: "Змінено Лист. 11",
    comment:
      "Lorem ipsum dolor sit amet consectetur. Augue cursus lacus sit imperdiet faucibus semper tellus amet risus. Magna id bibendum mattis vitae nec magna non dignissim phasellus. Velit tincidunt enim venenatis placerat accumsan elementum diam cras neque. Felis nec euismod pharetra elit sed tortor egestas volutpat. Nulla id justo blandit a elit. Pellentesque amet dui amet proin facilisi id. Est massa morbi sapien sit lacus. Eget blandit vestibulum euismod arcu id. Risus lorem justo aliquet tellus nec. Ipsum fermentum molestie pharetra at vel orci. Volutpat velit vitae mi scelerisque purus mauris magna ullamcorper aliquam. Phasellus lobortis sed accumsan gravida euismod facilisis turpis eget nibh. In enim pharetra sed mattis. Dui a leo sodales risus dapibus. Gravida id metus elit vitae lectus ultricies. Nibh scelerisque pellentesque varius purus consequat placerat ac sit in. Purus duis netus risus pharetra. At facilisis mus nulla at nisl. Et tristique sit ornare urna ac dui consequat. Augue vel lectus eget sem justo. Diam...",
  },
  onEditComment,
  onChangePassword,
  onMoreActions,
  onOpenRestorePassword,
}: UserProfileCardProps) {
  const [isEditingComment, setIsEditingComment] = useState(false);

  const handleEditComment = () => {
    setIsEditingComment(true);
    if (onEditComment) {
      onEditComment();
    }
  };

  const handleChangePassword = () => {
    if (onOpenRestorePassword) {
      onOpenRestorePassword();
    } else if (onChangePassword) {
      onChangePassword();
    }
  };

  const handleMoreActions = () => {
    if (onMoreActions) {
      onMoreActions();
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-6 w-full">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <Avatar className="h-16 w-16">
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#3A4754] mb-1">
              {user.displayName}
            </h2>
          </div>
        </div>
        {/* More Options */}{" "}
        <div className="flex flex-row gap-4 items-center">
          <div className="text-sm text-[#6D7A87]">id {user.userId}</div>
          <div className="text-sm text-[#6D7A87]">{user.lastModified}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-gray-100 border border-[#E0E0E0]">
                <MoreHorizontal className="h-5 w-5 text-[#3A4754]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleMoreActions}>
                Редагувати профіль
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleChangePassword}>
                Змінити пароль
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Видалити користувача
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-[#3A4754]">Коментар</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEditComment}
            className="h-10 w-10 rounded-full hover:bg-gray-100 border border-[#E0E0E0]">
            <SquarePenIcon className="h-4 w-4 text-[#3A4754]" />
          </Button>
        </div>
        <div className="text-sm text-[#3A4754] leading-relaxed">
          {user.comment}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex jr">
        <Button
          variant="BlackTransparent"
          size="lg"
          onClick={handleChangePassword}>
          Змінити пароль
        </Button>
      </div>
    </div>
  );
}
