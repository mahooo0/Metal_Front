import React, { PropsWithChildren } from "react";

import NuqsProvider from "./nuqs";
import { RootProvider } from "./root.provider";

export default function MainProvider({ children }: PropsWithChildren) {
  return (
    <div>
      <RootProvider>
        <NuqsProvider>{children}</NuqsProvider>
      </RootProvider>
    </div>
  );
}
