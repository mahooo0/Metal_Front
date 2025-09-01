import type { Card, ColumnT } from "../types";

export const findColumnIdByCardId = (
  cardId: string,
  cardsByColumn: Record<string, Card[]>
) => {
  const entry = Object.entries(cardsByColumn).find(([, cards]) =>
    cards.some(c => c.id === cardId)
  );
  return entry?.[0];
};

export const getColumnById = (columnId: string, columns: ColumnT[]) => {
  return columns.find(col => col.id === columnId);
};

export const getCardsByColumnId = (
  columnId: string,
  cardsByColumn: Record<string, Card[]>
) => {
  return cardsByColumn[columnId] || [];
};

export const getColumnCount = (
  columnId: string,
  cardsByColumn: Record<string, Card[]>
) => {
  return getCardsByColumnId(columnId, cardsByColumn).length;
};
