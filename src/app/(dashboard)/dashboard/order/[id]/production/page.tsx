import React from 'react'
import ProductionPageClient from './page.client'

    export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <ProductionPageClient id={id}    />
  );
}
