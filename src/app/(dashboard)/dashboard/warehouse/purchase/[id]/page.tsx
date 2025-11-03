import React from 'react'
import PurchaseByIdPageClient from './page.client';

export default async function PurchaseByIdPage( { params }: { params: Promise<{ id: string }> } ) {
  const { id } = await params;
  return <PurchaseByIdPageClient id={id} />;
}
