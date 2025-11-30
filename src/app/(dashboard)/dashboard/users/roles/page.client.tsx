"use client";

import React, { useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteRole } from "@/hooks/use-delete-role";
import { useRoles } from "@/hooks/use-roles";
import { RoleDto } from "@/service/roles.service";
import { Loader2, SquarePlus } from "lucide-react";

import { AddRoleDialog, ConfirmDialog } from "@/features/users/ui";

import { Badge } from "@/shared/ui/badge";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import { PageHeader } from "@/shared/ui/page-header";
import { Pagination } from "@/shared/ui/pagination";

// Функция форматирования даты
function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    return isoDate;
  }
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

// Определение колонок для таблицы
const roleColumns: DataTableColumn<RoleDto>[] = [
  {
    key: "name",
    label: "Назва",
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "system",
    label: "Системна",
    sortable: true,
    width: "120px",
    type: "text",
    render: (value: boolean) => (
      <Badge
        variant={value ? "secondary" : "outline"}
        className={value ? "bg-blue-100 text-blue-700" : ""}>
        {value ? "Так" : "Ні"}
      </Badge>
    ),
  },
  {
    key: "permissions",
    label: "Права доступу",
    sortable: false,
    width: "400px",
    type: "text",
    render: (value: string[]) => (
      <div className="flex flex-wrap gap-1 max-w-[400px]">
        {value && value.length > 0 ? (
          value.slice(0, 3).map((perm, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-xs bg-gray-50 text-gray-700">
              {perm}
            </Badge>
          ))
        ) : (
          <span className="text-gray-400 text-sm">Немає прав</span>
        )}
        {value && value.length > 3 && (
          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700">
            +{value.length - 3} ще
          </Badge>
        )}
      </div>
    ),
  },
  {
    key: "createdAt",
    label: "Дата створення",
    sortable: true,
    width: "180px",
    type: "date",
    render: (value: string) => (
      <span className="text-sm text-gray-600">{formatDate(value)}</span>
    ),
  },
  {
    key: "updatedAt",
    label: "Дата оновлення",
    sortable: true,
    width: "180px",
    type: "date",
    render: (value: string) => (
      <span className="text-sm text-gray-600">{formatDate(value)}</span>
    ),
  },
];

export default function RolesPageClient() {
  const { roles, isLoading, error } = useRoles();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleDto | null>(null);
  const [deletingRole, setDeletingRole] = useState<RoleDto | null>(null);
  const { deleteRole, isPending: isDeletePending } = useDeleteRole();

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingRole) {
        deleteRole(deletingRole.id);
      }
    },
    defaultTitle: "Видалити роль?",
    defaultDescription: "Ви впевнені, що хочете видалити цю роль?",
  });

  // Обработка загрузки
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Завантаження ролей...</span>
      </div>
    );
  }

  // Обработка ошибки
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">
            Помилка завантаження ролей
          </p>
          <p className="text-gray-500 text-sm">
            {error instanceof Error ? error.message : "Невідома помилка"}
          </p>
        </div>
      </div>
    );
  }

  // Расчет пагинации
  const totalPages = Math.ceil(roles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = roles.slice(startIndex, endIndex);

  const handleAddRole = () => {
    setEditingRole(null);
    setIsAddRoleDialogOpen(true);
  };

  const handleSaveRow = (_row: RoleDto) => {
    // TODO: Реализовать сохранение изменений роли
    console.log("Зберегти роль:", _row);
  };

  const handleEditRow = (row: RoleDto) => {
    setEditingRole(row);
    setIsAddRoleDialogOpen(true);
  };

  const handleDeleteRow = (row: RoleDto) => {
    setDeletingRole(row);
    confirmDelete.open({
      title: "Видалити роль?",
      description: `Ви впевнені, що хочете видалити роль "${row.name}"? Цю дію неможливо скасувати.${
        row.system
          ? " ⚠️ Це системна роль, видалення може вплинути на роботу системи."
          : ""
      }`,
    });
  };

  return (
    <div className="max-w-full mt-5">
      <div className=" mb-6 ">
        <PageHeader
          title="Ролі"
          count={roles.length}
          buttonText="Додати"
          buttonIcon={SquarePlus}
          buttonVariant="balck"
          onButtonClick={handleAddRole}
          showMargin={false}
        />
      </div>

      {/* Таблица */}
      <div className="max-w-[95vw] overflow-x-auto">
        <DataTable
          data={currentPageData}
          columns={roleColumns}
          idField="id"
          onSaveRow={handleSaveRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className="rounded-none"
          showActionsColumn={true}
        />
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Показано {startIndex + 1}-{Math.min(endIndex, roles.length)} з{" "}
              {roles.length} записів
            </div>
            <div className="w-fit">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      )}

      {/* Диалог добавления/редактирования роли */}
      <AddRoleDialog
        isOpen={isAddRoleDialogOpen}
        onClose={() => {
          setIsAddRoleDialogOpen(false);
          setEditingRole(null);
        }}
        initialData={editingRole}
      />

      {/* Диалог подтверждения удаления роли */}
      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={() => {
          confirmDelete.close();
          setDeletingRole(null);
        }}
        onConfirm={confirmDelete.confirm}
        title={confirmDelete.title}
        description={confirmDelete.description}
        isPending={isDeletePending}
      />
    </div>
  );
}
