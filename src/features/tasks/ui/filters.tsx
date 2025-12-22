"use client";

import React, { useEffect, useState } from "react";

import { useAdminUsers } from "@/hooks/use-admin-users";
import { useCounterparties } from "@/hooks/use-counterparties";
import { useOrderRequests } from "@/hooks/use-order-requests";
import { useTaskTypes } from "@/hooks/use-task-types";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Filter, Search } from "lucide-react";

import { DateRangePicker } from "@/features/orders/ui/date-range-picker";
import { TaskStatus, TasksQuery } from "@/features/tasks/types/task-api.types";
import { TaskTypeSelect } from "@/features/tasks/ui/task-type-select";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picked";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface TasksFiltersProps {
  onFilterChange?: (filters: Partial<TasksQuery>) => void;
  initialFilters?: Partial<TasksQuery>;
}

const TASK_STATUSES: { value: TaskStatus; label: string }[] = [
  { value: "PLANNING", label: "Планування" },
  { value: "BACKLOG", label: "Беклог" },
  { value: "TODO", label: "Зробити" },
  { value: "IN_PROGRESS", label: "В процесі" },
  { value: "CALCULATION", label: "Прорахунок" },
  { value: "DONE", label: "Виконано" },
  { value: "CANCELED", label: "Скасовано" },
];

const SORT_BY_OPTIONS: { value: TasksQuery["sortBy"]; label: string }[] = [
  { value: "createdAt", label: "Дата створення" },
  { value: "startExecutionDate", label: "Дата початку виконання" },
  { value: "type", label: "Тип" },
  { value: "status", label: "Статус" },
  { value: "responsibleUser", label: "Відповідальний" },
  { value: "createdBy", label: "Створив" },
];

export default function TasksFilters({
  onFilterChange,
  initialFilters = {},
}: TasksFiltersProps) {
  const { taskTypes } = useTaskTypes();
  const { counterparties } = useCounterparties({ page: 1, limit: 100 });
  const { data: usersData } = useAdminUsers({ page: 1, limit: 100 });
  const { data: ordersData } = useOrderRequests({ page: 1, limit: 100 });

  const [searchValue, setSearchValue] = useState(initialFilters.search || "");
  const [startExecutionDate, setStartExecutionDate] = useState<string>(() => {
    if (initialFilters.startExecutionDateFrom) {
      return initialFilters.startExecutionDateFrom;
    }
    return "";
  });
  const [createdAtRange, setCreatedAtRange] = useState<{
    from?: Date;
    to?: Date;
  }>(() => {
    if (initialFilters.createdAtFrom || initialFilters.createdAtTo) {
      return {
        from: initialFilters.createdAtFrom
          ? new Date(initialFilters.createdAtFrom)
          : undefined,
        to: initialFilters.createdAtTo
          ? new Date(initialFilters.createdAtTo)
          : undefined,
      };
    }
    return {};
  });
  const [taskTypeId, setTaskTypeId] = useState(initialFilters.taskTypeId || "");
  const [counterpartyId, setCounterpartyId] = useState(
    initialFilters.counterpartyId || ""
  );
  const [createdById, setCreatedById] = useState(
    initialFilters.createdById || ""
  );
  const [responsibleUserId, setResponsibleUserId] = useState(
    initialFilters.responsibleUserId || ""
  );
  const [status, setStatus] = useState(initialFilters.status || "");
  const [orderRequestId, setOrderRequestId] = useState(
    initialFilters.orderRequestId || ""
  );
  const [sortBy, setSortBy] = useState<TasksQuery["sortBy"]>(
    initialFilters.sortBy || "createdAt"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    (initialFilters.sortDirection as "asc" | "desc") || "desc"
  );

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({
        search: searchValue || undefined,
        startExecutionDateFrom: startExecutionDate || undefined,
        startExecutionDateTo: undefined,
        createdAtFrom: createdAtRange.from
          ? format(createdAtRange.from, "yyyy-MM-dd")
          : undefined,
        createdAtTo: createdAtRange.to
          ? format(createdAtRange.to, "yyyy-MM-dd")
          : undefined,
        taskTypeId: taskTypeId || undefined,
        counterpartyId: counterpartyId || undefined,
        createdById: createdById || undefined,
        responsibleUserId: responsibleUserId || undefined,
        status: (status as TaskStatus) || undefined,
        orderRequestId: orderRequestId || undefined,
        sortBy: sortBy || undefined,
        sortDirection: sortDirection || undefined,
      });
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setStartExecutionDate("");
    setCreatedAtRange({});
    setTaskTypeId("");
    setCounterpartyId("");
    setCreatedById("");
    setResponsibleUserId("");
    setStatus("");
    setOrderRequestId("");
    setSortBy("createdAt");
    setSortDirection("desc");
    if (onFilterChange) {
      onFilterChange({
        search: undefined,
        startExecutionDateFrom: undefined,
        startExecutionDateTo: undefined,
        createdAtFrom: undefined,
        createdAtTo: undefined,
        taskTypeId: undefined,
        counterpartyId: undefined,
        createdById: undefined,
        responsibleUserId: undefined,
        status: undefined,
        orderRequestId: undefined,
        sortBy: undefined,
        sortDirection: undefined,
        year: undefined,
        month: undefined,
        day: undefined,
      });
    }
  };

  const users = usersData?.users || [];
  const orders = ordersData?.data || [];

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5 grid grid-cols-6 gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6 col-span-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Шукати (назва, опис)"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] h-[42px]"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-[42px] w-[42px] rounded-full bg-[#3A4754] hover:bg-[#2A3A4A]">
          <Filter className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Date Created Range */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Дата створення
        </label>
        <DateRangePicker
          value={{
            from: createdAtRange.from,
            to: createdAtRange.to,
          }}
          onChange={range => {
            setCreatedAtRange({
              from: range?.from,
              to: range?.to,
            });
          }}
          placeholder="Оберіть період"
          className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
        />
      </div>

      {/* Start Execution Date */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Початок виконання
        </label>
        <DatePicker
          value={
            startExecutionDate
              ? format(new Date(startExecutionDate), "dd MMMM yyyy", {
                  locale: enUS,
                })
              : ""
          }
          onChange={value => {
            // DatePicker returns "15 January 2025" format, convert to "2025-01-15"
            if (value) {
              try {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                  setStartExecutionDate(format(date, "yyyy-MM-dd"));
                } else {
                  // Try parsing the formatted string
                  const parts = value.split(" ");
                  if (parts.length === 3) {
                    const day = parseInt(parts[0], 10);
                    const monthNames = [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ];
                    const month = monthNames.indexOf(parts[1]);
                    const year = parseInt(parts[2], 10);

                    if (month !== -1 && !isNaN(day) && !isNaN(year)) {
                      const date = new Date(year, month, day);
                      if (!isNaN(date.getTime())) {
                        setStartExecutionDate(format(date, "yyyy-MM-dd"));
                      }
                    }
                  }
                }
              } catch (error) {
                console.error("Error parsing date:", error);
              }
            } else {
              setStartExecutionDate("");
            }
          }}
          placeholder="Оберіть дату"
          className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full"
        />
      </div>

      {/* Task Type */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Тип задачі</label>
        <TaskTypeSelect
          value={taskTypeId}
          onValueChange={setTaskTypeId}
          placeholder="Оберіть тип"
        />
      </div>

      {/* Counterparty */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Контрагент</label>
        <Select value={counterpartyId} onValueChange={setCounterpartyId}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full">
            <SelectValue placeholder="Оберіть контрагента" />
          </SelectTrigger>
          <SelectContent>
            {counterparties.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-[#B6BDC3]">
                Немає контрагентів
              </div>
            ) : (
              counterparties.map(counterparty => (
                <SelectItem key={counterparty.id} value={counterparty.id}>
                  {counterparty.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Created By */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Створив</label>
        <Select value={createdById} onValueChange={setCreatedById}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full">
            <SelectValue placeholder="Оберіть користувача" />
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

      {/* Responsible User */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">
          Відповідальний
        </label>
        <Select value={responsibleUserId} onValueChange={setResponsibleUserId}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full">
            <SelectValue placeholder="Оберіть користувача" />
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

      {/* Status */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Статус</label>
        <Select
          value={status || "--"}
          onValueChange={value => setStatus(value === "--" ? "" : value)}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full">
            <SelectValue placeholder="Оберіть статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">--</SelectItem>
            {TASK_STATUSES.map(statusOption => (
              <SelectItem key={statusOption.value} value={statusOption.value}>
                {statusOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Order Request */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Замовлення</label>
        <Select value={orderRequestId} onValueChange={setOrderRequestId}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full">
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

      {/* Sort By */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">
          Сортувати за
        </label>
        <Select
          value={sortBy}
          onValueChange={value => setSortBy(value as TasksQuery["sortBy"])}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full">
            <SelectValue placeholder="Оберіть поле" />
          </SelectTrigger>
          <SelectContent>
            {SORT_BY_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value || ""}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Direction */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Напрямок</label>
        <Select
          value={sortDirection}
          onValueChange={value => setSortDirection(value as "asc" | "desc")}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm w-full">
            <SelectValue placeholder="Оберіть напрямок" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">За зростанням</SelectItem>
            <SelectItem value="desc">За спаданням</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <Button variant="balck" size="lg" className="mt-7" onClick={handleApply}>
        Застосувати
      </Button>
      <Button
        variant="BlackTransparent"
        size="lg"
        className="mt-7"
        onClick={handleReset}>
        Скинути
      </Button>
    </div>
  );
}
