import React, { PropsWithChildren } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function NuqsProvider({ children }: PropsWithChildren) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
