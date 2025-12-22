import type { PurchaseTableRow } from "../types/purchase.types";

// Mock data for testing purposes (not used in production - API is used instead)
export const mockPurchaseData: PurchaseTableRow[] = [
  {
    id: "1",
    date: "2024-01-18T10:00:00Z",
    purchaseId: "987177673",
    supplierName: "Постачальник 1",
    supplierId: "supplier-1",
    totalAmount: 943.65,
    status: "IN_PROCESS",
    comment: "Lorem ipsum dolor sit amet, consect...",
    createdAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "2",
    date: "2024-01-19T10:00:00Z",
    purchaseId: "987177674",
    supplierName: "Постачальник 2",
    supplierId: "supplier-2",
    totalAmount: 1234.5,
    status: "UNDER_REVIEW",
    comment: "Lorem ipsum dolor sit amet, consect...",
    createdAt: "2024-01-19T10:00:00Z",
  },
  {
    id: "3",
    date: "2024-01-20T10:00:00Z",
    purchaseId: "987177675",
    supplierName: "Постачальник 3",
    supplierId: "supplier-3",
    totalAmount: 756.3,
    status: "PLANNING",
    comment: "Lorem ipsum dolor sit amet, consect...",
    createdAt: "2024-01-20T10:00:00Z",
  },
];
