import React from 'react'
import SuppliersByIdPageClient from './page.client';

export default async function SuppliersByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SuppliersByIdPageClient id={id} />;
}
