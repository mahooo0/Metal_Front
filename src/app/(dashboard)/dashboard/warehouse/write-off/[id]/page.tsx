import React from "react";

import WriteOffByIdPageClient from "./page.client";

export default function WriteOffByIdPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <WriteOffByIdPageClient id={params.id} />
    </div>
  );
}
