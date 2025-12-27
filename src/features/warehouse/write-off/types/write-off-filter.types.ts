import { WriteOffStatus } from "@/service/write-offs.service";

export interface WriteOffFilterData {
  search: string;
  status: WriteOffStatus | "";
  dateFrom: string;
  dateTo: string;
}

export interface WriteOffFilterProps {
  filterData: WriteOffFilterData;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: WriteOffStatus | "") => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
}

export const initialWriteOffFilterData: WriteOffFilterData = {
  search: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};
