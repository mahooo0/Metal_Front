"use client";

import { Suspense, useState } from "react";

import { PlusIcon } from "lucide-react";

import AddCounterpartyDialog, {
  AddCounterpartyDialogData,
} from "@/features/counterparties/ui/add-counterparty-dialog";
import CounterpartiesTable from "@/features/counterparties/ui/counterparties-table";
import CounterpartiesFilter from "@/features/counterparties/ui/filter";

import { Button } from "@/shared/ui/button";

export default function CounterpartiesPageClient() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddCounterparty = () => {
    setIsAddDialogOpen(true);
  };

  const handleSaveCounterparty = (data: AddCounterpartyDialogData) => {
    // TODO: Implement save counterparty functionality
    console.log("Saving counterparty:", data);
  };

  const handleDeleteCounterparty = () => {
    // TODO: Implement delete counterparty functionality
    console.log("Deleting counterparty");
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Контрагенти <span className="text-[#B6BDC3] ">(205)</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleAddCounterparty}>
          <PlusIcon className="w-5 h-5" /> Додати контрагента
        </Button>
      </div>
      <Suspense fallback={<div className="bg-white rounded-2xl p-6 space-y-6 mt-5">Завантаження фільтрів...</div>}>
        <CounterpartiesFilter />
      </Suspense>
      <CounterpartiesTable />

      {/* Add Counterparty Dialog */}
      <AddCounterpartyDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveCounterparty}
        onDelete={handleDeleteCounterparty}
        title="Додати контрагента"
      />
    </div>
  );
}
