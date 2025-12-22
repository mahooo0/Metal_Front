"use client";

import React, { useEffect, useState } from "react";

import { useAdminUsers } from "@/hooks/use-admin-users";
import { useCreateTask } from "@/hooks/use-create-task";
import { useDeleteTask } from "@/hooks/use-delete-task";
import { useOrderRequests } from "@/hooks/use-order-requests";
import { useTaskById } from "@/hooks/use-task-by-id";
import { useUpdateTask } from "@/hooks/use-update-task";
import { format } from "date-fns";
import { ArrowLeft, ListTodo } from "lucide-react";
import { useQueryState } from "nuqs";

import { TaskStatus } from "@/features/tasks/types/task-api.types";
import { TaskTypeSelect } from "@/features/tasks/ui/task-type-select";
import { getTaskStatusConfig } from "@/features/tasks/utils/get-task-status-config";

import { Button } from "@/shared/ui/button";
import { DateTimePicker } from "@/shared/ui/date-time-picker";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";

import { FileUploadSection } from "../../order/ui/file-upload-section";

export function CreateTaskSheet() {
  const [createTask, setCreateTask] = useQueryState("createTask", {
    defaultValue: "false",
  });
  const [editTaskId, setEditTaskId] = useQueryState("editTask", {
    defaultValue: null,
  });

  const isEditMode = !!editTaskId;
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const { data: ordersData } = useOrderRequests({ page: 1, limit: 100 });
  const { data: usersData } = useAdminUsers({ page: 1, limit: 100 });
  const { data: taskData, isLoading: isLoadingTask } = useTaskById(editTaskId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    orderRequestId: "",
    taskTypeId: "",
    startTime: "",
    endTime: "",
    responsibleUserId: "",
    status: "PLANNING" as TaskStatus,
  });

  // Load data when editing
  useEffect(() => {
    if (isEditMode && taskData && createTask === "true") {
      const task = taskData;
      setFormData({
        title: task.title || "",
        description: task.description || "",
        orderRequestId: task.orderRequestId || "",
        taskTypeId: task.taskTypeId || "",
        startTime: task.startTime || "",
        endTime: task.endTime || "",
        responsibleUserId: task.responsibleUserId || "",
        status: task.status || "PLANNING",
      });
    }
  }, [isEditMode, taskData, createTask]);

  // Reset form when sheet closes
  useEffect(() => {
    if (createTask !== "true") {
      setFormData({
        title: "",
        description: "",
        orderRequestId: "",
        taskTypeId: "",
        startTime: "",
        endTime: "",
        responsibleUserId: "",
        status: "PLANNING",
      });
      setEditTaskId(null);
    }
  }, [createTask, setEditTaskId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStartTimeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      startTime: value,
    }));
  };

  const handleEndTimeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      endTime: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      // Edit mode validation
      if (
        !formData.title ||
        !formData.description ||
        !formData.taskTypeId ||
        !formData.startTime ||
        !formData.endTime ||
        !formData.responsibleUserId
      ) {
        return;
      }

      // Extract date from startTime for startExecutionDate
      const startDate = new Date(formData.startTime);
      const startExecutionDate = format(startDate, "yyyy-MM-dd");

      const updateData = {
        title: formData.title,
        description: formData.description,
        taskTypeId: formData.taskTypeId,
        startExecutionDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        responsibleUserId: formData.responsibleUserId,
        status: formData.status,
      };

      updateMutation.mutate(
        { id: editTaskId!, data: updateData },
        {
          onSuccess: () => {
            setCreateTask("false");
            setEditTaskId(null);
          },
        }
      );
    } else {
      // Create mode validation
      if (
        !formData.title ||
        !formData.description ||
        !formData.orderRequestId ||
        !formData.taskTypeId ||
        !formData.startTime ||
        !formData.endTime ||
        !formData.responsibleUserId
      ) {
        return;
      }

      // Extract date from startTime for startExecutionDate
      const startDate = new Date(formData.startTime);
      const startExecutionDate = format(startDate, "yyyy-MM-dd");

      const taskData = {
        title: formData.title,
        description: formData.description,
        orderRequestId: formData.orderRequestId,
        taskTypeId: formData.taskTypeId,
        startExecutionDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        responsibleUserId: formData.responsibleUserId,
      };

      createMutation.mutate(taskData, {
        onSuccess: () => {
          setCreateTask("false");
        },
      });
    }
  };

  const handleClose = () => {
    setCreateTask("false");
    setEditTaskId(null);
  };

  const orders = ordersData?.data || [];
  const users = usersData?.users || [];

  return (
    <Sheet
      open={createTask === "true"}
      onOpenChange={open => {
        if (!open) handleClose();
      }}>
      <SheetContent className="min-w-[620px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none"
                onClick={handleClose}
                disabled={createMutation.isPending || updateMutation.isPending}>
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              {isEditMode ? "Редагування задачі" : "Створення задачі"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="title"
                className="text-sm text-[#3A4754] font-medium">
                Назва задачі
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={e => handleInputChange("title", e.target.value)}
                placeholder="Введіть назву задачі"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="description"
                className="text-sm text-[#3A4754] font-medium">
                Опис задачі
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                className="min-h-[120px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                placeholder="Введіть опис задачі"
                required
              />
            </div>

            {!isEditMode && (
              <div className="grid gap-2">
                <Label
                  htmlFor="orderRequestId"
                  className="text-sm text-[#3A4754] font-medium">
                  Замовлення
                </Label>
                <Select
                  value={formData.orderRequestId}
                  onValueChange={value =>
                    handleInputChange("orderRequestId", value)
                  }>
                  <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                    <SelectValue placeholder="Оберіть замовлення" />
                  </SelectTrigger>
                  <SelectContent>
                    {orders.length === 0 ? (
                      <div className="px-2 py-1.5 text-sm text-[#B6BDC3]">
                        Немає замовлень
                      </div>
                    ) : (
                      orders.map(order => (
                        <SelectItem key={order.id} value={order.id}>
                          {order.indexLike || order.title || order.id}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid gap-2">
              <Label
                htmlFor="taskTypeId"
                className="text-sm text-[#3A4754] font-medium">
                Тип задачі
              </Label>
              <TaskTypeSelect
                value={formData.taskTypeId}
                onValueChange={value => handleInputChange("taskTypeId", value)}
                placeholder="Оберіть тип задачі"
              />
            </div>

            <div className="grid gap-2">
              <DateTimePicker
                label="Час початку виконання"
                value={formData.startTime}
                onChange={handleStartTimeChange}
                placeholder="Оберіть дату та час початку"
              />
            </div>

            <div className="grid gap-2">
              <DateTimePicker
                label="Час закінчення виконання"
                value={formData.endTime}
                onChange={handleEndTimeChange}
                placeholder="Оберіть дату та час закінчення"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="responsibleUserId"
                className="text-sm text-[#3A4754] font-medium">
                Відповідальний
              </Label>
              <Select
                value={formData.responsibleUserId}
                onValueChange={value =>
                  handleInputChange("responsibleUserId", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="Оберіть відповідального" />
                </SelectTrigger>
                <SelectContent>
                  {users.length === 0 ? (
                    <div className="px-2 py-1.5 text-sm text-[#B6BDC3]">
                      Немає користувачів
                    </div>
                  ) : (
                    users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.displayName ||
                          `${user.firstName} ${user.lastName}`.trim() ||
                          user.email}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {isEditMode && (
              <div className="grid gap-2">
                <Label
                  htmlFor="status"
                  className="text-sm text-[#3A4754] font-medium">
                  Статус
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={value =>
                    handleInputChange("status", value as TaskStatus)
                  }>
                  <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                    <SelectValue placeholder="Оберіть статус" />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      [
                        "PLANNING",
                        "BACKLOG",
                        "TODO",
                        "IN_PROGRESS",
                        "CALCULATION",
                        "DONE",
                        "CANCELED",
                      ] as TaskStatus[]
                    ).map(status => {
                      const config = getTaskStatusConfig(status);
                      return (
                        <SelectItem key={status} value={status}>
                          {config.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}

            <FileUploadSection title="згорнути" />
          </form>
        </div>
        <SheetFooter className="flex items-center justify-between flex-row gap-6">
          <SheetClose asChild className="w-1/2">
            <Button
              variant="BlackTransparent"
              size="lg"
              onClick={handleClose}
              disabled={createMutation.isPending || updateMutation.isPending}>
              Відхилити
            </Button>
          </SheetClose>
          <Button
            type="submit"
            variant="balck"
            size="lg"
            className="w-1/2"
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              isLoadingTask
            }
            onClick={handleSubmit}>
            {createMutation.isPending || updateMutation.isPending
              ? "Збереження..."
              : isEditMode
                ? "Оновити задачу"
                : "Зберегти задачу"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
