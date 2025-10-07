"use client";

import React, { Suspense } from "react";

import { SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import ApplicationsTable from "@/features/applications/ui/applications-table";
import { CreateApplicationSheet } from "@/features/applications/ui/create-applicattion-sheet";
import ApplicationsFilters from "@/features/applications/ui/filters";
import { ViewApplicationSheet } from "@/features/applications/ui/view-task-sheet";

import { Button } from "@/shared/ui/button";

function ApplicationsContent() {
  const [, setCreateApplication] = useQueryState("createApplication", {
    defaultValue: "false",
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Всі Задачі <span className="text-[#B6BDC3] ">(205)</span>
        </h1>
        <Button
          variant="balck"
          size="lg"
          onClick={() => setCreateApplication("true")}>
          <SquarePlus className="w-5 h-5" /> Додати Задачу
        </Button>
      </div>
      <ApplicationsFilters />
      <ApplicationsTable />
      <CreateApplicationSheet />
      <ViewApplicationSheet />
    </div>
  );
}

export default function ApplicationsPageClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationsContent />
    </Suspense>
  );
}
