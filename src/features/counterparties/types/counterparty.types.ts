export interface CounterpartyContact {
  id: string;
  phone: string;
  email: string;
  counterpartyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CounterpartyDocument {
  id: string;
  name: string;
  type: string;
  path: string;
  counterpartyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CounterpartyItem {
  id: string;
  name: string;
  comment: string | null;
  legalAddress: string;
  actualAddress: string;
  bankDetails: string | null;
  edrpou: string | null;
  ipn: string | null;
  vatCertificate: string | null;
  createdAt: string;
  updatedAt: string;
  contacts: CounterpartyContact[];
  documents: CounterpartyDocument[];
}

export interface CounterpartyOrder {
  id: number;
  date: string;
  orderNumber: string;
  responsible: string;
  calculationDate: string;
  endDate: string;
  status: string;
}

export interface CounterpartiesQuery {
  page?: number;
  limit?: number;
  search?: string;
  edrpou?: string;
  ipn?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface CounterpartiesResponse {
  data: CounterpartyItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CounterpartiesTableProps {
  data?: CounterpartyItem[];
  onSaveRow?: (row: CounterpartyItem) => void;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onDeleteRow?: (row: CounterpartyItem) => void;
  currentPage?: number;
  totalPages?: number;
  total?: number;
  limit?: number;
}

export interface CounterpartyOrdersTableProps {
  data?: CounterpartyOrder[];
  onSaveRow?: (row: CounterpartyOrder) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}
