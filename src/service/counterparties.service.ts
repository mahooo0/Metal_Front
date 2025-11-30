import {
  CounterpartiesQuery,
  CounterpartiesResponse,
  CounterpartyContact,
  CounterpartyItem,
} from "@/features/counterparties/types/counterparty.types";

import { api } from "@/shared/api";

class CounterpartiesService {
  public list(params: CounterpartiesQuery = { page: 1, limit: 20 }) {
    return api.get<CounterpartiesResponse>("counterparties", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search ? { search: params.search } : {}),
        ...(params.edrpou ? { edrpou: params.edrpou } : {}),
        ...(params.ipn ? { ipn: params.ipn } : {}),
        ...(params.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder ? { sortOrder: params.sortOrder } : {}),
      },
    });
  }

  public create(data: { name: string; comment?: string }) {
    return api.post<CounterpartyItem>("counterparties", data);
  }

  public delete(id: string) {
    return api.delete<void>(`counterparties/${id}`);
  }

  public getById(id: string) {
    return api.get<CounterpartyItem>(`counterparties/${id}`);
  }

  public update(id: string, data: UpdateCounterpartyDto) {
    return api.patch<CounterpartyItem>(`counterparties/${id}`, data);
  }

  public createContact(
    counterpartyId: string,
    data: { phone: string; email: string }
  ) {
    return api.post<CounterpartyContact>(
      `counterparties/${counterpartyId}/contacts`,
      data
    );
  }

  public updateContact(
    counterpartyId: string,
    contactId: string,
    data: { phone: string; email: string }
  ) {
    return api.patch<CounterpartyContact>(
      `counterparties/${counterpartyId}/contacts/${contactId}`,
      data
    );
  }

  public deleteContact(counterpartyId: string, contactId: string) {
    return api.delete<void>(
      `counterparties/${counterpartyId}/contacts/${contactId}`
    );
  }
}

export interface UpdateCounterpartyDto {
  name: string;
  comment?: string;
  legalAddress: string;
  actualAddress: string;
  bankDetails?: string;
  edrpou?: string;
  ipn?: string;
  vatCertificate?: string;
}

export const counterpartiesService = new CounterpartiesService();
