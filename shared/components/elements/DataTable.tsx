"use client";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  SortingFn,
} from "@tanstack/react-table";
import Pagination from "./UI/Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: TData, index: number) => string);
  cellClassName?: string;
  pageSize?: number;
  enablePagination?: boolean;
  maxVisiblePages?: number;
  enableSorting?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className = "",
  tableClassName = "",
  headerClassName = "",
  bodyClassName = "",
  rowClassName = "",
  cellClassName = "",
  pageSize = 10,
  enablePagination = true,
  maxVisiblePages = 5,
  enableSorting = true,
}: DataTableProps<TData, TValue>) {
  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const parseDmyStringToTime = (value: unknown): number => {
    if (typeof value !== "string") return Number.NEGATIVE_INFINITY;
    const trimmed = value.trim();
    if (!trimmed) return Number.NEGATIVE_INFINITY;

    const [dd, mon, yyyy] = trimmed.split("-");
    const day = Number(dd);
    const year = Number(yyyy);
    const monthIndex = monthMap[mon];

    if (!day || !year || monthIndex === undefined) {
      return Number.NEGATIVE_INFINITY;
    }

    return new Date(year, monthIndex, day).getTime();
  };

  const dateDmySortingFn: SortingFn<TData> = (rowA, rowB, columnId) => {
    const a = parseDmyStringToTime(rowA.getValue(columnId));
    const b = parseDmyStringToTime(rowB.getValue(columnId));
    return a === b ? 0 : a > b ? 1 : -1;
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    sortingFns: enableSorting
      ? {
          "date-dd-mmm-yyyy": dateDmySortingFn,
        }
      : {},
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  const getRowClassName = (row: TData, index: number): string => {
    if (typeof rowClassName === "function") {
      return rowClassName(row, index);
    }
    return rowClassName;
  };

  return (
    <div
      className={`bg-white rounded-md overflow-hidden flex flex-col ${className}`}
    >
      <div className="pb-3">
        <div className="overflow-x-auto">
          <table className={`w-full ${tableClassName}`}>
            <thead className={headerClassName}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = enableSorting && header.column.getCanSort();
                    const sortDir = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        className={`text-left px-4 py-3 ${
                          canSort ? "cursor-pointer select-none" : ""
                        } ${cellClassName}`}
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {header.isPlaceholder ? null : (
                          <span className="inline-flex items-center gap-1">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {canSort && (
                              <span className="text-[10px] text-mo-gray">
                                {sortDir === "asc"
                                  ? "▲"
                                  : sortDir === "desc"
                                  ? "▼"
                                  : ""}
                              </span>
                            )}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className={bodyClassName}>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:outline-1 hover:-outline-offset-1 ${getRowClassName(
                    row.original,
                    index
                  )}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`px-4 py-3 ${cellClassName}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {enablePagination && table.getPageCount() > 1 && (
          <div className="px-4 py-3 border-t border-mo-gray-border">
            <Pagination
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              onPageChange={(page) => table.setPageIndex(page - 1)}
              onPrevious={() => table.previousPage()}
              onNext={() => table.nextPage()}
              canPrevious={table.getCanPreviousPage()}
              canNext={table.getCanNextPage()}
              maxVisiblePages={maxVisiblePages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
