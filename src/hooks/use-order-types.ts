import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { orderTypesService } from "@/service/order-types.service";
import {
  OrderType,
  CreateOrderTypeDto,
  UpdateOrderTypeDto,
} from "@/features/orders/types/order-type.types";

export function useOrderTypes() {
  const { data, isLoading, error } = useQuery<OrderType[]>({
    queryKey: ["order-types"],
    queryFn: () => orderTypesService.list(),
  });

  return {
    orderTypes: data || [],
    isLoading,
    error,
  };
}

export function useCreateOrderType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderTypeDto) => orderTypesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-types"] });
    },
  });
}

export function useUpdateOrderType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderTypeDto }) =>
      orderTypesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-types"] });
    },
  });
}

export function useDeleteOrderType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderTypesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-types"] });
    },
  });
}

