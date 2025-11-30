"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { useAdminUsers } from "@/hooks/use-admin-users";
import { AdminUserItem } from "@/types/admin-users.types";
import { useQueryState } from "nuqs";

import { UserItem, UsersTableProps } from "@/features/users/types/user.types";

import { DataTableColumn } from "@/shared/ui/data-table";

interface ColumnConfig extends DataTableColumn<UserItem> {
  visible: boolean;
}

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

function mapToUserItem(u: AdminUserItem): UserItem {
  const roleName =
    u.roles && u.roles.length > 0 ? (u.roles[0]?.role?.name ?? "") : "";
  const contactsParts = [u.email]
    .concat(u.extraPhones ?? [])
    .filter(Boolean) as string[];

  return {
    id: u.id,
    creationDate: formatDate(u.createdAt),
    name: u.displayName || [u.firstName, u.lastName].filter(Boolean).join(" "),
    userId: u.id,
    role: roleName,
    contacts: contactsParts.join(", "),
    status: u.status,
  };
}

export function useUsersTable({
  data = [],
  onSaveRow,
  onPageChange,
  onDeleteRow,
  currentPage = 1,
}: UsersTableProps) {
  const router = useRouter();

  const [columns, setColumns] = React.useState<ColumnConfig[]>([
    {
      key: "creationDate",
      label: "Дата створення",
      sortable: true,
      width: "w-40",
      type: "date",
      visible: true,
    },
    {
      key: "name",
      label: "Ім'я",
      sortable: true,
      width: "w-48",
      type: "text",
      visible: true,
    },
    {
      key: "userId",
      label: "ID",
      sortable: false,
      width: "w-36",
      type: "text",
      visible: true,
    },
    {
      key: "role",
      label: "Роль",
      sortable: true,
      width: "w-32",
      type: "text",
      visible: true,
    },
    {
      key: "contacts",
      label: "Контакти",
      sortable: false,
      width: "w-40",
      type: "text",
      visible: true,
    },
    {
      key: "status",
      label: "Статус",
      sortable: true,
      width: "w-32",
      type: "text",
      visible: true,
    },
  ]);

  const [currentPageState, setCurrentPageState] =
    React.useState<number>(currentPage);
  const [pageSize] = React.useState(10);

  const [searchParam] = useQueryState<string | null>("search", {
    parse: value => value ?? null,
    serialize: value => value ?? "",
  });

  const requestParams = React.useMemo(
    () => ({
      page: currentPageState,
      limit: 20,
      ...(searchParam ? { search: searchParam } : {}),
    }),
    [currentPageState, searchParam]
  );

  const { data: adminData } = useAdminUsers(requestParams);

  const apiTableData = React.useMemo<UserItem[] | null>(() => {
    if (!adminData?.users) {
      return null;
    }
    return adminData.users.map(mapToUserItem);
  }, [adminData?.users]);

  const tableData = apiTableData ?? data;

  const calculatedTotalPages =
    adminData?.pagination?.totalPages ?? Math.ceil(tableData.length / pageSize);

  const startIndex = (currentPageState - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = tableData.slice(startIndex, endIndex);

  const isEmpty = (adminData?.users?.length ?? tableData.length) === 0;

  const toggleColumnVisibility = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSaveRow = (row: UserItem) => {
    if (onSaveRow) {
      onSaveRow(row);
    }
  };

  const handleEditRow = (_row: UserItem) => {
    // reserved for future edit logic
  };

  const handleDeleteRow = (row: UserItem) => {
    if (onDeleteRow) {
      onDeleteRow(row);
    }
  };

  const handleViewRow = (row: UserItem) => {
    router.push(`/dashboard/users/${row.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPageState(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return {
    columns,
    toggleColumnVisibility,
    currentPageData,
    calculatedTotalPages,
    handleSaveRow,
    handleEditRow,
    handleDeleteRow,
    handleViewRow,
    handlePageChange,
    isEmpty,
    currentPage: currentPageState,
  };
}
