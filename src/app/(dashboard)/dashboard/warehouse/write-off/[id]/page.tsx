import React from "react";

import WriteOffByIdPageClient from "./page.client";

export default async function WriteOffByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <WriteOffByIdPageClient id={id} />
    </div>
  );
}
