"use client";

import React, { Suspense } from "react";

import { SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import {
  CreateTaskSheet,
  TasksFilters,
  TasksTable,
  ViewTaskSheet,
} from "@/features/tasks";

import { Button } from "@/shared/ui/button";

function TasksContent() {
  const [_createTask, setCreateTask] = useQueryState("createTask", {
    defaultValue: "false",
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Всі Задачі <span className="text-[#B6BDC3] ">(205)</span>
        </h1>
        <Button variant="balck" size="lg" onClick={() => setCreateTask("true")}>
          <SquarePlus className="w-5 h-5" /> Додати Задачу
        </Button>
      </div>
      <TasksFilters />
      <TasksTable />
      <CreateTaskSheet />
      <ViewTaskSheet />
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
