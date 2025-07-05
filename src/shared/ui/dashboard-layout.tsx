"use client";

import { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

import { Sidebar, SidebarProvider, SidebarTrigger } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="flex h-16 items-center px-4 border-b lg:hidden">
            <SidebarTrigger />
            <div className="ml-4 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  A
                </span>
              </div>
              <span className="font-semibold">Admin Panel</span>
            </div>
          </div>

          {/* Main content */}
          <main className={cn("flex-1 overflow-y-auto", className)}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
