"use client";

import React from "react";

import { PlusIcon, PlusSquareIcon } from "lucide-react";

import {
  AddMaterialDialog,
  MaterialsFilter,
  MaterialsSheet,
  MaterialsTable,
} from "@/features/warehouse/materials";
import type {
  AddMaterialData,
  MaterialsFilterData,
  MaterialsSheetData,
} from "@/features/warehouse/materials";

import { Button } from "@/shared/ui/button";

export default function MaterialsPageClient() {
  const [isAddMaterialDialogOpen, setIsAddMaterialDialogOpen] =
    React.useState(false);
  const [isMaterialsSheetOpen, setIsMaterialsSheetOpen] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] =
    React.useState<MaterialsSheetData | null>(null);

  const handleApplyFilter = (data: MaterialsFilterData) => {
    console.log("Applied filter:", data);
    // TODO: Implement filter logic
  };

  const handleResetFilter = () => {
    console.log("Reset filter");
    // TODO: Implement reset logic
  };

  const handleAddMaterial = () => {
    setIsAddMaterialDialogOpen(true);
  };

  const handleCloseAddMaterialDialog = () => {
    setIsAddMaterialDialogOpen(false);
  };

  const handleSaveMaterial = (data: AddMaterialData) => {
    console.log("Save material:", data);
    // TODO: Implement save material logic
  };

  const handleViewDetails = (material: MaterialsSheetData) => {
    setSelectedMaterial(material);
    setIsMaterialsSheetOpen(true);
  };

  const handleCloseMaterialsSheet = () => {
    setIsMaterialsSheetOpen(false);
    setSelectedMaterial(null);
  };

  const handleSaveMaterialsSheet = (data: MaterialsSheetData) => {
    console.log("Save materials sheet:", data);
    // TODO: Implement save logic
  };

  const handleRejectMaterialsSheet = () => {
    console.log("Reject materials sheet");
    // TODO: Implement reject logic
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Матеріали <span className="text-[#B6BDC3] ">(20965)</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleAddMaterial}>
          <PlusSquareIcon className="w-5 h-5" /> Додати матеріал
        </Button>
      </div>

      <MaterialsFilter
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />

      <MaterialsTable onViewDetails={handleViewDetails} />

      <AddMaterialDialog
        isOpen={isAddMaterialDialogOpen}
        onClose={handleCloseAddMaterialDialog}
        onSave={handleSaveMaterial}
      />

      <MaterialsSheet
        isOpen={isMaterialsSheetOpen}
        onClose={handleCloseMaterialsSheet}
        material={selectedMaterial}
        onSave={handleSaveMaterialsSheet}
        onReject={handleRejectMaterialsSheet}
      />
    </div>
  );
}
