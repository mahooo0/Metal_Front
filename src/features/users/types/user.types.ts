export interface UserItem {
  id: string;
  creationDate: string;
  name: string;
  userId: string;
  role: string;
  contacts: string;
}

export interface UsersTableProps {
  data?: UserItem[];
  onSaveRow?: (row: UserItem) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}
