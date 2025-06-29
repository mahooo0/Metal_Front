"use client";

import { type PropsWithChildren, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function TanstackProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
