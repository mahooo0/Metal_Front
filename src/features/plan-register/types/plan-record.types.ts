export interface MetalBrand {
  id: string;
  name: string;
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

export interface PlanRecordCount {
  files: number;
}

export interface PlanRecord {
  id: string;
  registrationDate: string;
  planNumber: string;
  orderNumber: string;
  customer: string;
  metalThickness: number;
  metalBrandId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  metalBrand: MetalBrand;
  createdBy: CreatedBy;
  _count: PlanRecordCount;
}

export interface PlanRecordsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PlanRecordsResponse {
  data: PlanRecord[];
  meta: PlanRecordsMeta;
}

export interface PlanRecordsQuery {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  counterpartyId?: string;
  createdById?: string;
  metalBrandId?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  page?: number;
  limit?: number;
}

