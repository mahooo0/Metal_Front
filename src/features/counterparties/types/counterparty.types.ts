export interface CounterpartyItem {
  id: number;
  creationDate: string;
  name: string;
  counterpartyId: string;
  comment: string;
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

export interface CounterpartiesTableProps {
  data?: CounterpartyItem[];
  onSaveRow?: (row: CounterpartyItem) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

export interface CounterpartyOrdersTableProps {
  data?: CounterpartyOrder[];
  onSaveRow?: (row: CounterpartyOrder) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}
