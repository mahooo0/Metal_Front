import React from "react";

import {
  CounterpartyContacts,
  CounterpartyDocuments,
} from "@/features/counterparties/ui";
import CounterpartyDetails from "@/features/counterparties/ui/counterparty-details";
import AccountMovement from "@/features/order/ui/account-movement";

export default function SuppliersByIdPageClient({ id }: { id: string }) {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <CounterpartyDetails />
        </div>

        <div className="col-span-4 space-y-6">
          <AccountMovement />
        </div>
        <div className="col-span-8 space-y-6">
          <CounterpartyDocuments />
        </div>
        <div className="col-span-4 space-y-6">
          <CounterpartyContacts />
        </div>
      </div>
    </div>
  );
}
