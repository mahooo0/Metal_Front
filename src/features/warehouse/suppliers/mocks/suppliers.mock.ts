import type { Supplier } from "../types/supplier.types";

export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "ТОВ Метал-Постач",
    edrpou: "38935167",
    ipn: "389351615535",
    taxId: "200149913",
    legalAddress: "м. Одеса, вул. Арнаутська, 76",
    actualAddress: "м. Одеса, вул. Арнаутська, 76",
    bankDetails: "IBAN: UA393287040000026009301149913",
    contacts: [
      {
        id: "c1",
        name: "Іван Петров",
        phone: "+380501234567",
        email: "ivan@company.com",
      },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "ПП Сталь-Трейд",
    edrpou: "12345678",
    ipn: "123456789012",
    legalAddress: "м. Київ, вул. Хрещатик, 1",
    contacts: [
      {
        id: "c2",
        name: "Марія Сидоренко",
        phone: "+380671234567",
        email: "maria@steel-trade.ua",
      },
    ],
    createdAt: "2024-02-20T14:30:00Z",
    updatedAt: "2024-02-20T14:30:00Z",
  },
];
