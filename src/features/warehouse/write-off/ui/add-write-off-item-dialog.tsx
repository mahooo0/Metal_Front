"use client";

import React, { useMemo, useState } from "react";

import { useAddWriteOffItem } from "@/hooks/use-add-write-off-item";
import { useMaterials } from "@/hooks/use-materials";
import { Material } from "@/service/materials.service";
import { Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

interface AddWriteOffItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  writeOffId: string;
  existingMaterialIds: string[];
}

export function AddWriteOffItemDialog({
  open,
  onOpenChange,
  writeOffId,
  existingMaterialIds,
}: AddWriteOffItemDialogProps) {
  const [search, setSearch] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");

  const { materials, isLoading } = useMaterials({ page: 1, limit: 100 });
  const addItemMutation = useAddWriteOffItem(writeOffId);

  // Filter materials: exclude already added and filter by search
  const filteredMaterials = useMemo(() => {
    return materials
      .filter(m => !existingMaterialIds.includes(m.id))
      .filter(m => m.quantity > 0)
      .filter(m => {
        if (!search) return true;
        const searchLower = search.toLowerCase();
        return (
          m.materialItem?.name?.toLowerCase().includes(searchLower) ||
          m.materialItem?.type?.name?.toLowerCase().includes(searchLower)
        );
      });
  }, [materials, existingMaterialIds, search]);

  const handleSelectMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setQuantity("");
    setComment("");
  };

  const handleBack = () => {
    setSelectedMaterial(null);
    setQuantity("");
    setComment("");
  };

  const handleSubmit = () => {
    if (!selectedMaterial || !quantity) return;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return;

    addItemMutation.mutate(
      {
        materialId: selectedMaterial.id,
        quantity: qty,
        comment: comment || undefined,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setSelectedMaterial(null);
          setQuantity("");
          setComment("");
          setSearch("");
        },
      }
    );
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedMaterial(null);
    setQuantity("");
    setComment("");
    setSearch("");
  };

  const maxQuantity = selectedMaterial?.quantity || 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px] !min-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {selectedMaterial ? "Додати товар" : "Вибрати товар"}
          </DialogTitle>
        </DialogHeader>

        {!selectedMaterial ? (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Пошук за назвою або типом..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex-1 overflow-auto min-h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]" />
                </div>
              ) : filteredMaterials.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {search ? "Товари не знайдено" : "Немає доступних товарів"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Назва</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Розмір</TableHead>
                      <TableHead>На складі</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map(material => (
                      <TableRow
                        key={material.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSelectMaterial(material)}>
                        <TableCell>
                          {material.materialItem?.name || "-"}
                        </TableCell>
                        <TableCell>
                          {material.materialItem?.type?.name || "-"}
                        </TableCell>
                        <TableCell>
                          {material.width || 0} x {material.length || 0}
                        </TableCell>
                        <TableCell>{material.quantity} шт</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Вибрати
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">
                {selectedMaterial.materialItem?.name}
              </p>
              <p className="text-sm text-gray-500">
                {selectedMaterial.materialItem?.type?.name} •{" "}
                {selectedMaterial.width} x {selectedMaterial.length}
              </p>
              <p className="text-sm text-gray-500">
                На складі: {selectedMaterial.quantity} шт
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Кількість до списання *</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={maxQuantity}
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder={`Макс: ${maxQuantity}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Коментар</Label>
              <Input
                id="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Необов'язково"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {selectedMaterial ? (
            <>
              <Button variant="outline" onClick={handleBack}>
                Назад
              </Button>
              <Button
                variant="balck"
                onClick={handleSubmit}
                disabled={
                  !quantity ||
                  parseInt(quantity, 10) <= 0 ||
                  parseInt(quantity, 10) > maxQuantity ||
                  addItemMutation.isPending
                }>
                {addItemMutation.isPending ? "Додавання..." : "Додати"}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleClose}>
              Скасувати
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
