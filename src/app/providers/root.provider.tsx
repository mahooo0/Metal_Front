"use client";

import { type PropsWithChildren } from "react";

import { TanstackProvider } from "./tanstack.provider";
import { ToastProvider } from "./toast.provider";

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <TanstackProvider>
      {children}
      <ToastProvider />
    </TanstackProvider>
  );
}
