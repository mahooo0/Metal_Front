"use client";

import { type PropsWithChildren } from "react";
import { TanstackProvider } from "./tanstack.provider";

export function RootProvider({ children }: PropsWithChildren) {
  return <TanstackProvider>{children}</TanstackProvider>;
}
