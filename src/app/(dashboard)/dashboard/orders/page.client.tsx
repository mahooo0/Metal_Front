"use client";

import React from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteOrderRequest } from "@/hooks/use-delete-order-request";
import { useOrderRequests } from "@/hooks/use-order-requests";
import { useQueryState } from "nuqs";

import { OrdersSheet } from "@/features/order/ui/sheets/orders";
import { KanbanBoard, OrdersHeader } from "@/features/orders";
import { CreateOrderRequestSheet } from "@/features/orders/ui/create-order-request-sheet";
import OrdersDataTable from "@/features/orders/ui/table/orders-data-table";
import { mapOrderRequestToTableItem } from "@/features/orders/utils/map-order-request-to-table";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

export default function OrdersPageClient() {
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) || num < 1 ? "1" : value;
    },
  });
  const [limit, setLimit] = useQueryState("limit", {
    defaultValue: "20",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) || num < 1 ? "20" : value;
    },
  });

  const pageNumber = parseInt(page || "1", 10);
  const limitNumber = parseInt(limit || "20", 10);

  const {
    data: orderRequestsData,
    isLoading,
    error,
  } = useOrderRequests({
    page: pageNumber,
    limit: limitNumber,
  });
  const { deleteOrderRequest, isPending: isDeleting } = useDeleteOrderRequest();

  const [currentView, setCurrentView] = useQueryState("currentView", {
    defaultValue: "list",
  });
  const [createOrder, setCreateOrder] = useQueryState("createOrder", {
    defaultValue: "false",
  });
  const [editOrderId, setEditOrderId] = useQueryState("editOrder", {
    defaultValue: "",
  });

  const tableData = React.useMemo(() => {
    if (!orderRequestsData?.data) return [];
    return orderRequestsData.data.map(mapOrderRequestToTableItem);
  }, [orderRequestsData]);

  const totalPages = orderRequestsData?.meta?.totalPages || 1;
  const totalOrders = orderRequestsData?.meta?.total || 0;
  const currentPageFromApi = orderRequestsData?.meta?.page || pageNumber;

  // Синхронизируем page из API с query параметром
  React.useEffect(() => {
    if (currentPageFromApi !== pageNumber && currentPageFromApi > 0) {
      setPage(currentPageFromApi.toString());
    }
  }, [currentPageFromApi, pageNumber, setPage]);
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleAddOrder = () => {
    setCreateOrder("true");
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
  };

  const handleSaveRow = (row: any) => {
    // Here you can add API call to save the updated row
    console.log("Row saved:", row);
  };

  const handleEditRow = (row: any) => {
    setEditOrderId(row.id);
    setCreateOrder("true");
  };

  const [deletingOrderId, setDeletingOrderId] = React.useState<string | null>(
    null
  );

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingOrderId) {
        deleteOrderRequest(deletingOrderId);
        setDeletingOrderId(null);
      }
    },
    defaultTitle: "Видалити замовлення?",
    defaultDescription:
      "Ви впевнені, що хочете видалити це замовлення? Цю дію неможливо скасувати.",
  });

  const handleDeleteRow = (row: any) => {
    setDeletingOrderId(row.id);
    confirmDelete.open({
      title: "Видалити замовлення?",
      description: `Ви впевнені, що хочете видалити замовлення "${row.orderNumber || row.id}"? Цю дію неможливо скасувати.`,
    });
  };

  return (
    <div className="w-full h-full">
      <OrdersHeader
        totalOrders={totalOrders}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onViewChange={setCurrentView}
        onAddOrder={handleAddOrder}
      />
      {currentView === "list" && (
        <OrdersDataTable
          data={tableData}
          onPageChange={handlePageChange}
          onSaveRow={handleSaveRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          currentPage={pageNumber}
          totalPages={totalPages}
        />
      )}
      {currentView === "grid" && <KanbanBoard />}
      <CreateOrderRequestSheet />
      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={confirmDelete.close}
        onConfirm={confirmDelete.confirm}
        title={confirmDelete.title}
        description={confirmDelete.description}
        isPending={isDeleting}
      />
    </div>
  );
}
