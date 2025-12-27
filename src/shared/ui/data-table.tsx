"use client";

import * as React from "react";

import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: any, row: T) => React.ReactNode;
  renderEdit?: (
    value: any,
    row: T,
    onChange: (value: any) => void
  ) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  idField: keyof T;
  pageSize?: number;
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl";
  enableEditOnDoubleClick?: boolean;
  onSaveRow?: (row: T) => void;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  onViewRow?: (row: T) => void;
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  currentPage?: number;
  totalPages?: number;
  className?: string;
  showActionsColumn?: boolean;
  customActions?: (row: T) => React.ReactNode;
  additionalMenuItems?: (row: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  idField,
  pageSize = 10,
  onSaveRow,
  onPageChange,
  onRowClick,
  onRowDoubleClick,
  onViewRow,
  onEditRow,
  onDeleteRow,
  currentPage = 1,
  totalPages = 1,
  className = "",
  showActionsColumn = true,
  customActions,
  additionalMenuItems,
  fontSize = "sm",
  enableEditOnDoubleClick = true,
}: DataTableProps<T>) {
  // local copy to allow editing without mutating props
  const [rows, setRows] = React.useState<T[]>(data);

  // sort state
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  // editing state
  const [editingRowId, setEditingRowId] = React.useState<any>(null);
  const [draft, setDraft] = React.useState<Partial<T> | null>(null);

  React.useEffect(() => setRows(data), [data]);

  // click timeout for distinguishing single vs double click
  const clickTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleSort = (key: keyof T) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    const source = rows;
    if (!sortConfig) return source;

    return [...source].sort((a, b) => {
      const aValue = a[sortConfig.key] as unknown as string;
      const bValue = b[sortConfig.key] as unknown as string;
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig]);

  const getSortIcon = (key: keyof T) => {
    if (sortConfig?.key !== key)
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  const beginEdit = (row: T) => {
    setEditingRowId(row[idField]);
    setDraft({ ...row });
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setDraft(null);
  };

  const commitEdit = () => {
    if (!editingRowId || !draft) return;

    setRows(prev =>
      prev.map(r =>
        r[idField] === editingRowId ? ({ ...r, ...draft } as T) : r
      )
    );
    if (onSaveRow) onSaveRow(draft as T);
    setEditingRowId(null);
    setDraft(null);
  };

  const onCellChange = <K extends keyof T>(key: K, value: T[K]) => {
    setDraft(prev => ({ ...(prev as T), [key]: value }));
  };

  const onInputKeyDown: React.KeyboardEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  const handleRowClick = (row: T) => {
    // Single click logic removed - only double click for edit
    // This function is kept for potential future use
  };

  const handleRowDoubleClick = (row: T) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current); // cancel the single-click redirect
      clickTimeout.current = null;
    }
    // Trigger edit mode on double click only when enabled
    if (enableEditOnDoubleClick) {
      beginEdit(row);
    }
    // Also call the custom double click handler if provided
    if (onRowDoubleClick) {
      onRowDoubleClick(row);
    }
  };

  const sizeClass = React.useMemo(() => {
    return fontSize ? `text-${fontSize}` : "text-sm";
  }, [fontSize]);

  const renderReadCell = (row: T, key: keyof T) => {
    const column = columns.find(col => col.key === key);
    if (column?.render) {
      return column.render(row[key], row);
    }
    return (
      <span
        className={`${sizeClass} text-gray-900 whitespace-normal break-words`}>
        {String(row[key] ?? "")}
      </span>
    );
  };

  const renderEditCell = (key: keyof T, value: any) => {
    const column = columns.find(col => col.key === key);
    if (column?.renderEdit) {
      return column.renderEdit(value, draft as T, newValue =>
        onCellChange(key, newValue)
      );
    }

    // Default editors based on column type
    const base = `mt-0.5 w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 ${sizeClass} outline-none focus:border-gray-400`;

    if (
      column?.type === "date" ||
      (typeof value === "string" &&
        value.includes("-") &&
        /^\d{4}-\d{2}-\d{2}/.test(value))
    ) {
      return (
        <input
          type="date"
          className={base}
          value={toDateInputValue(value)}
          onChange={e => onCellChange(key, e.target.value as any)}
          onKeyDown={onInputKeyDown}
        />
      );
    }

    if (column?.type === "select" && column.options) {
      return (
        <select
          className={base}
          value={value as string}
          onChange={e => onCellChange(key, e.target.value as any)}
          onKeyDown={onInputKeyDown}>
          {column.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (column?.type === "number") {
      return (
        <input
          type="number"
          className={base}
          value={value ?? ""}
          onChange={e => onCellChange(key, e.target.value as any)}
          onKeyDown={onInputKeyDown}
        />
      );
    }

    return (
      <input
        type="text"
        className={base}
        value={value ?? ""}
        onChange={e => onCellChange(key, e.target.value as any)}
        onKeyDown={onInputKeyDown}
      />
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-[16px] overflow-y-auto  shadow-md ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            {columns.map(column => (
              <TableHead
                key={String(column.key)}
                className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs"
                style={{ width: column.width }}>
                <div className="flex items-center gap-2 text-nowrap">
                  {column.sortable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                      onClick={() => handleSort(column.key)}>
                      {getSortIcon(column.key)}
                    </Button>
                  )}
                  <span>{column.label}</span>
                </div>
              </TableHead>
            ))}
            {/* Actions column header */}
            {showActionsColumn && (
              <TableHead className="w-24 p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Дії
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.map(row => {
            const isEditing = editingRowId === row[idField];
            const current = isEditing ? (draft as T) : row;

            return (
              <TableRow
                key={String(row[idField])}
                className={`border-gray-100 hover:bg-[#EBFBFF] ${isEditing ? "bg-gray-50/70" : ""}`}
                onDoubleClick={() => handleRowDoubleClick(row)}>
                {columns.map(column => (
                  <TableCell
                    key={String(column.key)}
                    className={`px-4 py-4 ${sizeClass} h-fit shadow-xs`}
                    style={{ width: column.width }}>
                    {isEditing
                      ? renderEditCell(column.key, current[column.key])
                      : renderReadCell(row, column.key)}
                  </TableCell>
                ))}

                {/* actions */}
                {showActionsColumn && (
                  <TableCell className="px-6 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                          onClick={commitEdit}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                          onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {customActions && customActions(row)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-gray-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {additionalMenuItems && additionalMenuItems(row)}
                            {onViewRow && (
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onViewRow(row)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Переглянути
                              </DropdownMenuItem>
                            )}
                            {onEditRow && (
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onEditRow(row)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Редагувати
                              </DropdownMenuItem>
                            )}
                            {onDeleteRow && (
                              <DropdownMenuItem
                                className="cursor-pointer text-red-600 hover:text-red-700"
                                onClick={() => onDeleteRow(row)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Видалити
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Сторінка {currentPage} з {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}>
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => handlePageChange(pageNum)}>
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Convert any date-like to yyyy-MM-dd string for <input type="date"> */
function toDateInputValue(v: unknown) {
  if (!v) return "";
  // If it's already YYYY-MM-DD, keep it
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
