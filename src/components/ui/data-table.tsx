
import React from "react";

// For compatibility with @tanstack/react-table-like columns
type Column<T> = {
  accessorKey?: keyof T | string;
  header: string;
  id?: string;
  cell?: (props: { row: T }) => React.ReactNode;
};

interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
}

/**
 * Minimal DataTable - only supports text content and custom action cells.
 */
export function DataTable<T = any>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, i) => (
              <th
                key={col.id || col.accessorKey?.toString() || i}
                className="px-4 py-2 text-left font-semibold text-gray-800"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={(row as any).id || rowIdx} className="border-b">
              {columns.map((col, colIdx) => (
                <td key={col.id || col.accessorKey?.toString() || colIdx} className="px-4 py-2">
                  {col.cell
                    ? col.cell({ row })
                    : // Fallback to accessorKey value
                      ((col.accessorKey && (row as any)[col.accessorKey as string]) ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
