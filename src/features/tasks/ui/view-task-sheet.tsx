"use client";

import React, { useState } from "react";

import { useTaskById } from "@/hooks/use-task-by-id";
import { useAddTaskComment } from "@/hooks/use-task-comments";
import NeqrVockax from "@/public/neqr_s_ockami.png";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import DOMPurify from "isomorphic-dompurify";
import {
  BookOpen,
  Calendar,
  ChevronUp,
  CircleDollarSign,
  Clock,
  ListTodo,
  Pause,
  Send,
  X as XCircle,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { formatTimeAgo } from "@/shared/lib";
import { cn } from "@/shared/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import Tiptap from "@/shared/ui/tiptap";

import { FileUploadSection } from "../../order/ui/file-upload-section";
import { getTaskStatusConfig } from "../utils/get-task-status-config";

export function ViewTaskSheet() {
  const [viewTask, setViewTask] = useQueryState("viewTask", {
    defaultValue: "false",
  });
  const [taskId, setTaskId] = useQueryState("taskId");
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const { data: taskData, isLoading: isLoadingTask } = useTaskById(
    taskId,
    viewTask === "true"
  );
  const { addComment, isPending: isAddingComment } = useAddTaskComment(taskId);

  const task = taskData;
  const comments = task?.comments || [];

  const handleSendComment = () => {
    const text = commentContent.replace(/<[^>]+>/g, "").trim();
    if (!text) {
      toast.error("Введіть коментар");
      return;
    }
    addComment(commentContent, {
      onSuccess: () => {
        toast.success("Коментар додано");
        setCommentContent("");
        // Clear Tiptap editor by triggering onChange with empty string
        // This will be handled by the Tiptap component's onUpdate
      },
      onError: (err: unknown) => {
        const message =
          typeof err === "object" && err && "message" in err
            ? String((err as { message?: string }).message)
            : undefined;
        toast.error(message || "Не вдалося додати коментар");
      },
    });
  };

  const handleClose = () => {
    setViewTask("false");
    setTaskId(null);
    setCommentContent("");
  };

  if (isLoadingTask) {
    return (
      <Sheet open={viewTask === "true"} onOpenChange={open => handleClose()}>
        <SheetContent className="min-w-[850px] max-w-[850px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-[#6D7A87]">Завантаження...</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!task) {
    return (
      <Sheet open={viewTask === "true"} onOpenChange={open => handleClose()}>
        <SheetContent className="min-w-[850px] max-w-[850px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
          <div className="flex items-center justify-center h-64">
            <p className="text-[#6D7A87]">Задачу не знайдено</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const statusConfig = getTaskStatusConfig(task.status);
  const createdByInitial =
    task.createdBy?.displayName?.charAt(0) ||
    task.createdBy?.firstName?.charAt(0) ||
    "?";
  const responsibleInitial =
    task.responsibleUser?.displayName?.charAt(0) ||
    task.responsibleUser?.firstName?.charAt(0) ||
    "?";

  return (
    <Sheet open={viewTask === "true"} onOpenChange={open => handleClose()}>
      <SheetContent className="min-w-[850px] max-w-[850px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between mb-6">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none gap-2"
                onClick={handleClose}>
                <XCircle className="w-4 h-4" /> Закрити
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6 px-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[28px] text-[#3A4754] font-bold">
              {task.title}
            </h2>
            <Badge
              variant="secondary"
              className={`rounded-2xl py-1 px-3 inline-block ${statusConfig.bgColor}`}>
              <span className={`text-xs font-medium ${statusConfig.textColor}`}>
                {statusConfig.label}
              </span>
            </Badge>
          </div>

          {/* Task Type Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#3A4754]">
              {task.taskType?.name || "Тип задачі"}
            </h3>

            {/* Creator and Responsible */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#6D7A87]">Створив:</span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#EDEEF0] text-[#3A4754]">
                    {createdByInitial}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-[#3A4754]">
                  {task.createdBy?.displayName ||
                    `${task.createdBy?.firstName || ""} ${task.createdBy?.lastName || ""}`.trim() ||
                    "Невідомо"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#6D7A87]">Відповідальний:</span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#EDEEF0] text-[#3A4754]">
                    {responsibleInitial}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-[#3A4754]">
                  {task.responsibleUser?.displayName ||
                    `${task.responsibleUser?.firstName || ""} ${task.responsibleUser?.lastName || ""}`.trim() ||
                    "Невідомо"}
                </span>
              </div>
            </div>

            {/* Task Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">Створено</span>
                <span className="text-sm text-[#3A4754]">
                  {task.createdAt
                    ? format(new Date(task.createdAt), "dd/MM/yyyy", {
                        locale: uk,
                      })
                    : "Невідомо"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CircleDollarSign className="w-5 h-5 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">Сутність</span>
                <span className="text-sm text-[#3A4754]">
                  {task.orderRequest?.indexLike ||
                    task.orderRequest?.title ||
                    task.orderRequestId ||
                    "Немає"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">Дата завершення</span>
                <span className="text-sm text-[#3A4754]">
                  {task.endTime
                    ? format(new Date(task.endTime), "dd/MM/yyyy", {
                        locale: uk,
                      })
                    : "Невідомо"}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#6D7A87] mt-0.5" />
                <span className="text-sm text-[#6D7A87]">Опис</span>
                <p className="text-sm text-[#3A4754] flex-1">
                  {task.description || "Опис відсутній"}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}

          {/* File Upload Section */}

          <FileUploadSection title="згорнути" />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="blue" size="lg" className="flex-1 gap-2">
              <Pause className="w-4 h-4" />
              Пауза/ Відкласти
            </Button>
            <Button variant="outline" size="lg" className="flex-1 gap-2">
              <div className="w-4 h-4 rounded-sm border-2 border-current flex items-center justify-center"></div>
              Завершити
            </Button>
          </div>

          {/* Comment Section */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-[#3A4754]">Коментар</h3>
            <div className="space-y-3">
              <Tiptap onChange={setCommentContent} />
              <div className="flex justify-end">
                <Button
                  variant="balck"
                  size="lg"
                  onClick={handleSendComment}
                  disabled={isAddingComment || !commentContent.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  {isAddingComment ? "Відправка..." : "Надіслати"}
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment, index) => {
                const name =
                  comment.createdBy?.displayName ||
                  `${comment.createdBy?.firstName || ""} ${comment.createdBy?.lastName || ""}`.trim() ||
                  comment.createdBy?.email ||
                  "Користувач";
                const initial = name.trim().charAt(0).toUpperCase();
                const prevComment = index > 0 ? comments[index - 1] : null;
                const showDateSeparator =
                  prevComment &&
                  format(new Date(comment.createdAt), "yyyy-MM-dd") !==
                    format(new Date(prevComment.createdAt), "yyyy-MM-dd");

                return (
                  <React.Fragment key={comment.id}>
                    {showDateSeparator && (
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#E5E7EB]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-white px-3 text-[#6D7A87]">
                            {format(
                              new Date(comment.createdAt),
                              "dd MMMM yyyy",
                              { locale: uk }
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[#EDEEF0] text-[#3A4754]">
                          {initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-[#3A4754]">
                            {name}
                          </span>
                          <span className="text-xs text-[#6D7A87]">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <div
                          className="text-sm text-[#6D7A87] leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(comment.text || ""),
                          }}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-[#6D7A87]">Коментарів немає</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
