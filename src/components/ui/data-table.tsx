"use client";

import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableAlign = "left" | "center" | "right";

type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  width?: string;
  align?: DataTableAlign;
  headerClassName?: string;
  cellClassName?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  className?: string;
  tableClassName?: string;
  minWidth?: number | string;
  emptyMessage?: string;
};

const alignClassName: Record<DataTableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function DataTable<T>({
  columns,
  rows,
  getRowId,
  className,
  tableClassName,
  minWidth = 960,
  emptyMessage = "No results found.",
}: DataTableProps<T>) {
  const minWidthValue =
    typeof minWidth === "number" ? `${minWidth}px` : minWidth;

  return (
    <Card
      className={cn(
        "ring-border/60 gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-none",
        className
      )}
    >
      <CardContent className="p-0">
        <Table
          className={cn("table-fixed", tableClassName)}
          style={{ minWidth: minWidthValue }}
        >
          <colgroup>
            {columns.map((column) => (
              <col
                key={column.id}
                style={column.width ? { width: column.width } : undefined}
              />
            ))}
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    "text-muted-foreground px-5 text-[12px] font-medium",
                    column.align && alignClassName[column.align],
                    column.headerClassName
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground px-5 py-10 text-center text-[13px]"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={getRowId(row)} className="hover:bg-muted/40">
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={cn(
                        "px-5 py-3.5",
                        column.align && alignClassName[column.align],
                        column.cellClassName
                      )}
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { DataTable };
export type { DataTableAlign, DataTableColumn, DataTableProps };
