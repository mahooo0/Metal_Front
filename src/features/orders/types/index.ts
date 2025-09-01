export type Card = {
  id: string;
  title: string;
  subtitle?: string;
  createdAt?: string;
  completedAt?: string;
  companyName: string;
  orderId: string;
  assignedUsers?: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
};

export type ColumnT = {
  id: string;
  title: string;
};

export type BoardState = {
  columns: ColumnT[];
  cardsByColumn: Record<string, Card[]>;
};

export type ActiveDrag =
  | { type: "column"; column: ColumnT }
  | { type: "card"; card: Card; fromColumnId: string }
  | null;
