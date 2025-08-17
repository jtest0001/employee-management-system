import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Column<T> {
  key: (keyof T & string) | "actions";
  header: string;
  className?: string;
  render?: (id: string) => ReactNode;
}

interface IDataTable<T> {
  data: T[];
  columns: Column<T>[];
}
const DataTable = <T extends { id: string }>(props: IDataTable<T>) => {
  const { columns, data } = props;
  return (
    <Table>
      <TableHeader className="bg-background sticky top-0 z-10 h-12">
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.header.toUpperCase()}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((info) => (
          <TableRow key={info.id} data-testid={info.id}>
            {columns.map((column) => {
              const key = column.key;
              if (key === "actions") {
                return (
                  <TableCell key={key}>{column.render!(info.id)}</TableCell>
                );
              }

              const cellValue = info[key] as string;
              return <TableCell key={key}>{cellValue}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
