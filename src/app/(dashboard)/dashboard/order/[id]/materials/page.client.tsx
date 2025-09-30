import React from "react";

import AddMaterialForm from "@/features/materials/ui/add-material-form";
import CalculationsTable from "@/features/materials/ui/calculations-table";
import MaterialsTable from "@/features/materials/ui/materials-table";
import HeaderNav from "@/features/order/ui/header-nav";

export default function MaterialsPageClient({ id }: { id: string }) {
  return (
    <div className="mt-5">
      <HeaderNav orderId={id} activeTab="Матеріали" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <MaterialsTable />
        </div>
        <div className="col-span-5">
          <AddMaterialForm />
        </div>
      </div>
      <CalculationsTable />
    </div>
  );
}
