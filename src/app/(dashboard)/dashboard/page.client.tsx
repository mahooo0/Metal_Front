"use client";

import DashboardContentDnd from "@/features/dashboard/ui/content-dnd";
import ContentHeader from "@/features/dashboard/ui/content-header";

export function DashboardPageClient() {
  return (
    <div>
      <ContentHeader />
      <DashboardContentDnd />
    </div>
  );
}
