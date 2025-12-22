import {
  PlanRecord,
  PlanRecordsQuery,
  PlanRecordsResponse,
} from "@/features/plan-register/types/plan-record.types";

import { api } from "@/shared/api";

class PlanRecordsService {
  public getPlanRecords(params: PlanRecordsQuery = { page: 1, limit: 20 }) {
    return api.get<PlanRecordsResponse>("plan-records", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.dateFrom && { dateFrom: params.dateFrom }),
        ...(params.dateTo && { dateTo: params.dateTo }),
        ...(params.counterpartyId && { counterpartyId: params.counterpartyId }),
        ...(params.createdById && { createdById: params.createdById }),
        ...(params.metalBrandId && { metalBrandId: params.metalBrandId }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortDirection && { sortDirection: params.sortDirection }),
      },
    });
  }

  public getById(id: string) {
    return api.get<PlanRecord>(`plan-records/${id}`);
  }

  public create(data: {
    registrationDate: string;
    planNumber: string;
    orderNumber: string;
    metalBrandId: string;
    metalThickness: number;
  }) {
    console.log("PlanRecordsService.create called with data:", data);
    return api.post<PlanRecord>("plan-records", data);
  }

  public update(
    id: string,
    data: Partial<{
      registrationDate: string;
      planNumber: string;
      orderNumber: string;
      metalBrandId: string;
      metalThickness: number;
    }>
  ) {
    return api.put<PlanRecord>(`plan-records/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`plan-records/${id}`);
  }
}

export const planRecordsService = new PlanRecordsService();
