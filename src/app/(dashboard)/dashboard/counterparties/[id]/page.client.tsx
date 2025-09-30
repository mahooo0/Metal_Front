"use client";

import React from "react";

import CounterpartyContacts from "@/features/counterparties/ui/counterparty-contacts";
import CounterpartyDetails from "@/features/counterparties/ui/counterparty-details";
import CounterpartyDocuments from "@/features/counterparties/ui/counterparty-documents";
import CounterpartyOrdersTable from "@/features/counterparties/ui/counterparty-orders-table";
import AccountMovement from "@/features/order/ui/account-movement";

export default function CounterpartiesByIdPageClient() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <CounterpartyDetails />
        </div>

        <div className="col-span-4 space-y-6">
          <AccountMovement />
        </div>
        <div className="col-span-8">
          <CounterpartyOrdersTable />
        </div>
        <div className="col-span-4 space-y-6">
          <CounterpartyContacts />
          <CounterpartyDocuments />
        </div>
      </div>
    </div>
  );
}
