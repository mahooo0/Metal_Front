"use client";

import React, { useState } from "react";

import { useUserComments } from "@/hooks/use-user-comments";
import DOMPurify from "dompurify";
import { MoreHorizontal, SquarePenIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { User } from "@/features/auth/types/user.types";

import { formatTimeAgo } from "@/shared/lib";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { UserCommentSheet } from "./user-comment-sheet";
import { UserProfileEditDialog } from "./user-profile-edit-dialog";

interface UserProfileCardProps {
  user: User;
  onEditComment?: () => void;
  onChangePassword?: () => void;
  onMoreActions?: () => void;
  onOpenRestorePassword?: () => void;
}

export default function UserProfileCard({
  user,
  onEditComment,
  onChangePassword,
  onMoreActions,
  onOpenRestorePassword,
}: UserProfileCardProps) {
  const [, setIsEditingComment] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [, setSheet] = useQueryState("sheet", { defaultValue: "" });
  const { comments, isLoading: isCommentsLoading } = useUserComments(
    user.id,
    true
  );

  const handleEditComment = () => {
    setIsEditingComment(true);
    setSheet("user-comment");
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
    setIsEditDialogOpen(true);
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
          <div className="text-sm text-[#6D7A87]">id {user.id}</div>
          <div className="text-sm text-[#6D7A87]">
            {user.createdAt
              ? (() => {
                  const date = new Date(user.createdAt);
                  return isNaN(date.getTime())
                    ? "Unknown date"
                    : formatTimeAgo(user.createdAt);
                })()
              : "Unknown date"}
          </div>
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
        {isCommentsLoading ? (
          <div className="text-sm text-[#6D7A87]">Завантаження...</div>
        ) : comments && comments.length > 0 ? (
          <div className="text-[#3A4754]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#EDEEF0] text-[#3A4754] flex items-center justify-center text-sm font-semibold">
                {(
                  comments[0].createdBy?.displayName ||
                  comments[0].createdBy?.email ||
                  "Користувач"
                )
                  .trim()
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium">
                  {comments[0].createdBy?.displayName ||
                    comments[0].createdBy?.email ||
                    "Користувач"}
                </span>
                <span className="text-xs text-[#6D7A87]">
                  {formatTimeAgo(comments[0].createdAt)}
                </span>
              </div>
            </div>
            <div
              className="text-sm text-[#3A4754] leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(comments[0].text),
              }}
            />
          </div>
        ) : (
          <div className="text-sm text-[#6D7A87]">Коментарів немає</div>
        )}
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

      {/* Comment Sheet (only comments section) */}
      <UserCommentSheet
        onOpenChange={open => setSheet(open ? "user-comment" : "")}
        userId={user.id}
      />
      <UserProfileEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        userId={user.id}
        initial={{
          displayName: user.displayName,
          email: user.email,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          position: user.position || "",
          isTwoFactorEnabled: user.isTwoFactorEnabled,
        }}
      />
    </div>
  );
}
