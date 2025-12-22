"use client";

import React, { Suspense, useMemo, useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "@/hooks/use-delete-task";
import { useTasks } from "@/hooks/use-tasks";
import { SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import {
  CreateTaskSheet,
  TasksFilters,
  TasksTable,
  ViewTaskSheet,
} from "@/features/tasks";
import { TasksQuery } from "@/features/tasks/types/task-api.types";
import { TaskItem } from "@/features/tasks/types/task.types";
import { mapTaskToTableItem } from "@/features/tasks/utils/map-task-to-table";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { Button } from "@/shared/ui/button";

function TasksContent() {
  const [createTask, setCreateTask] = useQueryState("createTask", {
    defaultValue: "false",
  });
  const [editTask, setEditTask] = useQueryState("editTask");

  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) || num < 1 ? "1" : value;
    },
  });

  const [limit, setLimit] = useQueryState("limit", {
    defaultValue: "20",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) || num < 1 ? "20" : value;
    },
  });

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const [startExecutionDateFrom, setStartExecutionDateFrom] = useQueryState(
    "startExecutionDateFrom",
    { defaultValue: "" }
  );

  const [startExecutionDateTo, setStartExecutionDateTo] = useQueryState(
    "startExecutionDateTo",
    { defaultValue: "" }
  );

  const [createdAtFrom, setCreatedAtFrom] = useQueryState("createdAtFrom", {
    defaultValue: "",
  });

  const [createdAtTo, setCreatedAtTo] = useQueryState("createdAtTo", {
    defaultValue: "",
  });

  const [taskTypeId, setTaskTypeId] = useQueryState("taskTypeId", {
    defaultValue: "",
  });

  const [counterpartyId, setCounterpartyId] = useQueryState("counterpartyId", {
    defaultValue: "",
  });

  const [createdById, setCreatedById] = useQueryState("createdById", {
    defaultValue: "",
  });

  const [responsibleUserId, setResponsibleUserId] = useQueryState(
    "responsibleUserId",
    { defaultValue: "" }
  );

  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });

  const [orderRequestId, setOrderRequestId] = useQueryState("orderRequestId", {
    defaultValue: "",
  });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });

  const [sortDirection, setSortDirection] = useQueryState("sortDirection", {
    defaultValue: "desc",
  });

  const [year, setYear] = useQueryState("year", {
    defaultValue: "",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) ? "" : value;
    },
  });

  const [month, setMonth] = useQueryState("month", {
    defaultValue: "",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) || num < 1 || num > 12 ? "" : value;
    },
  });

  const [day, setDay] = useQueryState("day", {
    defaultValue: "",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) || num < 1 || num > 31 ? "" : value;
    },
  });

  const pageNumber = parseInt(page || "1", 10);
  const limitNumber = parseInt(limit || "20", 10);

  const queryParams: TasksQuery = useMemo(
    () => ({
      page: pageNumber,
      limit: limitNumber,
      ...(search && { search }),
      ...(startExecutionDateFrom && { startExecutionDateFrom }),
      ...(startExecutionDateTo && { startExecutionDateTo }),
      ...(createdAtFrom && { createdAtFrom }),
      ...(createdAtTo && { createdAtTo }),
      ...(taskTypeId && { taskTypeId }),
      ...(counterpartyId && { counterpartyId }),
      ...(createdById && { createdById }),
      ...(responsibleUserId && { responsibleUserId }),
      ...(status && { status: status as TasksQuery["status"] }),
      ...(orderRequestId && { orderRequestId }),
      ...(sortBy && { sortBy: sortBy as TasksQuery["sortBy"] }),
      ...(sortDirection && {
        sortDirection: sortDirection as "asc" | "desc",
      }),
      ...(year && { year: parseInt(year, 10) }),
      ...(month && { month: parseInt(month, 10) }),
      ...(day && { day: parseInt(day, 10) }),
    }),
    [
      pageNumber,
      limitNumber,
      search,
      startExecutionDateFrom,
      startExecutionDateTo,
      createdAtFrom,
      createdAtTo,
      taskTypeId,
      counterpartyId,
      createdById,
      responsibleUserId,
      status,
      orderRequestId,
      sortBy,
      sortDirection,
      year,
      month,
      day,
    ]
  );

  const { data: tasksData, isLoading, error } = useTasks(queryParams);

  const tableData = useMemo(() => {
    if (!tasksData?.data) return [];
    return tasksData.data.map(mapTaskToTableItem);
  }, [tasksData]);

  const totalPages = tasksData?.meta?.totalPages || 1;
  const total = tasksData?.meta?.total || 0;

  const { deleteTask, isPending: isDeleting } = useDeleteTask();
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingTaskId) {
        deleteTask(deletingTaskId);
        setDeletingTaskId(null);
      }
    },
    defaultTitle: "Видалити задачу?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цю задачу? Цю дію неможливо скасувати.",
  });

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  const handleEditRow = (row: TaskItem) => {
    setEditTask(row.id);
    setCreateTask("true");
  };

  const handleDeleteRow = (row: TaskItem) => {
    setDeletingTaskId(row.id);
    confirmDelete.open({
      title: "Видалити задачу?",
      description: `Ви впевнені, що хочете видалити цю задачу? Цю дію неможливо скасувати.`,
    });
  };

  const handleFilterChange = (filters: Partial<TasksQuery>) => {
    // Update filters - if key exists in object, update it (even if undefined, it means clear)
    if ("search" in filters) setSearch(filters.search || "");
    if ("startExecutionDateFrom" in filters)
      setStartExecutionDateFrom(filters.startExecutionDateFrom || "");
    if ("startExecutionDateTo" in filters)
      setStartExecutionDateTo(filters.startExecutionDateTo || "");
    if ("createdAtFrom" in filters)
      setCreatedAtFrom(filters.createdAtFrom || "");
    if ("createdAtTo" in filters) setCreatedAtTo(filters.createdAtTo || "");
    if ("taskTypeId" in filters) setTaskTypeId(filters.taskTypeId || "");
    if ("counterpartyId" in filters)
      setCounterpartyId(filters.counterpartyId || "");
    if ("createdById" in filters) setCreatedById(filters.createdById || "");
    if ("responsibleUserId" in filters)
      setResponsibleUserId(filters.responsibleUserId || "");
    if ("status" in filters) setStatus(filters.status || "");
    if ("orderRequestId" in filters)
      setOrderRequestId(filters.orderRequestId || "");
    if ("sortBy" in filters) setSortBy(filters.sortBy || "createdAt");
    if ("sortDirection" in filters)
      setSortDirection(filters.sortDirection || "desc");
    if ("year" in filters) setYear(filters.year ? String(filters.year) : "");
    if ("month" in filters)
      setMonth(filters.month ? String(filters.month) : "");
    if ("day" in filters) setDay(filters.day ? String(filters.day) : "");
    setPage("1"); // Reset to first page when filters change
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-bold">
          Всі Задачі <span className="text-[#B6BDC3]">({total})</span>
        </h1>
        <Button variant="balck" size="lg" onClick={() => setCreateTask("true")}>
          <SquarePlus className="w-5 h-5" /> Додати Задачу
        </Button>
      </div>
      <TasksFilters
        onFilterChange={handleFilterChange}
        initialFilters={queryParams}
      />
      <TasksTable
        data={tableData}
        isLoading={isLoading}
        error={error}
        currentPage={pageNumber}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
      />
      <CreateTaskSheet />
      <ViewTaskSheet />
      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={confirmDelete.close}
        onConfirm={confirmDelete.confirm}
        title={confirmDelete.title}
        description={confirmDelete.description}
      />
    </div>
  );
}

export default function TasksPageClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TasksContent />
    </Suspense>
  );
}
