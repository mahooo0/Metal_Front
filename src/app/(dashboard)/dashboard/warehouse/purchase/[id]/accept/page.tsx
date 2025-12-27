import PurchaseAcceptPageClient from "./page.client";

export default async function PurchaseAcceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PurchaseAcceptPageClient id={id} />;
}
