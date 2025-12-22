export type OrderRequestStatus =
  | "NEW_ORDER"
  | "CALCULATION"
  | "CLARIFICATION"
  | "EXTRA_SERVICES";

export interface OrderType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Counterparty {
  id: string;
  name: string;
  comment?: string;
  legalAddress: string;
  actualAddress: string;
  bankDetails?: string;
  edrpou?: string;
  ipn?: string;
  vatCertificate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatedBy {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface OrderRequestCount {
  files: number;
  comments: number;
  tasks: number;
}

export interface OrderRequest {
  id: string;
  title: string;
  description: string;
  indexLike: string;
  status: OrderRequestStatus;
  startTime: string;
  endTime: string;
  orderTypeId: string;
  counterpartyId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  orderType: OrderType;
  counterparty: Counterparty;
  createdBy: CreatedBy;
  _count?: OrderRequestCount;
  files?: any[];
  comments?: any[];
  tasks?: any[];
}

export interface OrderRequestsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderRequestsResponse {
  data: OrderRequest[];
  meta: OrderRequestsMeta;
}

