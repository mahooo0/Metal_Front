import { create } from "zustand";

import { OrderRequest, OrderRequestStatus } from "../types/order-request.types";

interface OrdersByStatus {
  [status: string]: OrderRequest[];
}

interface OrdersKanbanStore {
  ordersByStatus: OrdersByStatus;
  isLoading: Record<string, boolean>;
  setOrdersByStatus: (
    status: OrderRequestStatus,
    orders: OrderRequest[]
  ) => void;
  addOrder: (order: OrderRequest) => void;
  updateOrder: (orderId: string, updates: Partial<OrderRequest>) => void;
  moveOrder: (
    orderId: string,
    fromStatus: OrderRequestStatus,
    toStatus: OrderRequestStatus,
    insertIndex?: number
  ) => void;
  removeOrder: (orderId: string, status: OrderRequestStatus) => void;
  setLoading: (status: OrderRequestStatus, isLoading: boolean) => void;
  reset: () => void;
}

const initialOrdersByStatus: OrdersByStatus = {
  NEW_ORDER: [],
  CALCULATION: [],
  CLARIFICATION: [],
  EXTRA_SERVICES: [],
};

export const useOrdersKanbanStore = create<OrdersKanbanStore>(set => ({
  ordersByStatus: initialOrdersByStatus,
  isLoading: {
    NEW_ORDER: false,
    CALCULATION: false,
    CLARIFICATION: false,
    EXTRA_SERVICES: false,
  },

  setOrdersByStatus: (status, orders) =>
    set(state => ({
      ordersByStatus: {
        ...state.ordersByStatus,
        [status]: orders,
      },
    })),

  addOrder: order =>
    set(state => ({
      ordersByStatus: {
        ...state.ordersByStatus,
        [order.status]: [...(state.ordersByStatus[order.status] || []), order],
      },
    })),

  updateOrder: (orderId, updates) =>
    set(state => {
      const newOrdersByStatus = { ...state.ordersByStatus };

      // Находим заказ во всех статусах и обновляем
      Object.keys(newOrdersByStatus).forEach(status => {
        const orders = newOrdersByStatus[status];
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          newOrdersByStatus[status] = [
            ...orders.slice(0, index),
            { ...orders[index], ...updates },
            ...orders.slice(index + 1),
          ];
        }
      });

      return { ordersByStatus: newOrdersByStatus };
    }),

  moveOrder: (orderId, fromStatus, toStatus, insertIndex) =>
    set(state => {
      if (fromStatus === toStatus) return state;

      const fromOrders = [...(state.ordersByStatus[fromStatus] || [])];
      const toOrders = [...(state.ordersByStatus[toStatus] || [])];

      const orderIndex = fromOrders.findIndex(o => o.id === orderId);
      if (orderIndex === -1) return state;

      const order = fromOrders[orderIndex];
      const updatedOrder = { ...order, status: toStatus };

      fromOrders.splice(orderIndex, 1);

      // Вставляем заказ в указанную позицию или в конец, если индекс не указан
      const finalIndex =
        insertIndex !== undefined ? insertIndex : toOrders.length;
      toOrders.splice(finalIndex, 0, updatedOrder);

      return {
        ordersByStatus: {
          ...state.ordersByStatus,
          [fromStatus]: fromOrders,
          [toStatus]: toOrders,
        },
      };
    }),

  removeOrder: (orderId, status) =>
    set(state => ({
      ordersByStatus: {
        ...state.ordersByStatus,
        [status]: (state.ordersByStatus[status] || []).filter(
          o => o.id !== orderId
        ),
      },
    })),

  setLoading: (status, isLoading) =>
    set(state => ({
      isLoading: {
        ...state.isLoading,
        [status]: isLoading,
      },
    })),

  reset: () =>
    set({
      ordersByStatus: initialOrdersByStatus,
      isLoading: {
        NEW_ORDER: false,
        CALCULATION: false,
        CLARIFICATION: false,
        EXTRA_SERVICES: false,
      },
    }),
}));
