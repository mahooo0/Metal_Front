import { useEffect, useMemo, useRef } from "react";

import { useOrderRequestsByStatus } from "@/hooks/use-order-requests-by-status";

import { useOrdersKanbanStore } from "../stores/orders-kanban-store";
import { OrderRequestStatus } from "../types/order-request.types";

const STATUSES: OrderRequestStatus[] = [
  "NEW_ORDER",
  "CALCULATION",
  "CLARIFICATION",
  "EXTRA_SERVICES",
];

export function useKanbanOrders() {
  const setOrdersByStatus = useOrdersKanbanStore(
    state => state.setOrdersByStatus
  );
  const setLoading = useOrdersKanbanStore(state => state.setLoading);
  const ordersByStatus = useOrdersKanbanStore(state => state.ordersByStatus);

  // Загружаем данные для каждого статуса
  const newOrderQuery = useOrderRequestsByStatus("NEW_ORDER");
  const calculationQuery = useOrderRequestsByStatus("CALCULATION");
  const clarificationQuery = useOrderRequestsByStatus("CLARIFICATION");
  const extraServicesQuery = useOrderRequestsByStatus("EXTRA_SERVICES");

  const queries = {
    NEW_ORDER: newOrderQuery,
    CALCULATION: calculationQuery,
    CLARIFICATION: clarificationQuery,
    EXTRA_SERVICES: extraServicesQuery,
  };

  // Стабилизируем массивы orders с помощью useMemo
  const newOrderIds = useMemo(
    () =>
      newOrderQuery.orders
        ?.map(o => o.id)
        .sort()
        .join(",") || "",
    [newOrderQuery.orders]
  );
  const calculationOrderIds = useMemo(
    () =>
      calculationQuery.orders
        ?.map(o => o.id)
        .sort()
        .join(",") || "",
    [calculationQuery.orders]
  );
  const clarificationOrderIds = useMemo(
    () =>
      clarificationQuery.orders
        ?.map(o => o.id)
        .sort()
        .join(",") || "",
    [clarificationQuery.orders]
  );
  const extraServicesOrderIds = useMemo(
    () =>
      extraServicesQuery.orders
        ?.map(o => o.id)
        .sort()
        .join(",") || "",
    [extraServicesQuery.orders]
  );

  // Используем ref для отслеживания предыдущих значений
  const prevOrdersRef = useRef<Record<string, string>>({});
  const prevLoadingRef = useRef<Record<string, boolean>>({});

  // Отдельные useEffect для каждого статуса, чтобы избежать циклических зависимостей
  useEffect(() => {
    const status: OrderRequestStatus = "NEW_ORDER";
    const query = newOrderQuery;

    if (prevLoadingRef.current[status] !== query.isLoading) {
      setLoading(status, query.isLoading);
      prevLoadingRef.current[status] = query.isLoading;
    }

    if (query.orders && !query.isLoading && newOrderIds) {
      const prevOrderIds = prevOrdersRef.current[status] || "";

      if (prevOrderIds !== newOrderIds) {
        setOrdersByStatus(status, query.orders);
        prevOrdersRef.current[status] = newOrderIds;
      }
    }
  }, [
    newOrderIds,
    newOrderQuery.isLoading,
    newOrderQuery.orders,
    setOrdersByStatus,
    setLoading,
  ]);

  useEffect(() => {
    const status: OrderRequestStatus = "CALCULATION";
    const query = calculationQuery;

    if (prevLoadingRef.current[status] !== query.isLoading) {
      setLoading(status, query.isLoading);
      prevLoadingRef.current[status] = query.isLoading;
    }

    if (query.orders && !query.isLoading && calculationOrderIds) {
      const prevOrderIds = prevOrdersRef.current[status] || "";

      if (prevOrderIds !== calculationOrderIds) {
        setOrdersByStatus(status, query.orders);
        prevOrdersRef.current[status] = calculationOrderIds;
      }
    }
  }, [
    calculationOrderIds,
    calculationQuery.isLoading,
    calculationQuery.orders,
    setOrdersByStatus,
    setLoading,
  ]);

  useEffect(() => {
    const status: OrderRequestStatus = "CLARIFICATION";
    const query = clarificationQuery;

    if (prevLoadingRef.current[status] !== query.isLoading) {
      setLoading(status, query.isLoading);
      prevLoadingRef.current[status] = query.isLoading;
    }

    if (query.orders && !query.isLoading && clarificationOrderIds) {
      const prevOrderIds = prevOrdersRef.current[status] || "";

      if (prevOrderIds !== clarificationOrderIds) {
        setOrdersByStatus(status, query.orders);
        prevOrdersRef.current[status] = clarificationOrderIds;
      }
    }
  }, [
    clarificationOrderIds,
    clarificationQuery.isLoading,
    clarificationQuery.orders,
    setOrdersByStatus,
    setLoading,
  ]);

  useEffect(() => {
    const status: OrderRequestStatus = "EXTRA_SERVICES";
    const query = extraServicesQuery;

    if (prevLoadingRef.current[status] !== query.isLoading) {
      setLoading(status, query.isLoading);
      prevLoadingRef.current[status] = query.isLoading;
    }

    if (query.orders && !query.isLoading && extraServicesOrderIds) {
      const prevOrderIds = prevOrdersRef.current[status] || "";

      if (prevOrderIds !== extraServicesOrderIds) {
        setOrdersByStatus(status, query.orders);
        prevOrdersRef.current[status] = extraServicesOrderIds;
      }
    }
  }, [
    extraServicesOrderIds,
    extraServicesQuery.isLoading,
    extraServicesQuery.orders,
    setOrdersByStatus,
    setLoading,
  ]);

  return {
    ordersByStatus,
    isLoading: Object.values(queries).some(q => q.isLoading),
    queries,
  };
}
