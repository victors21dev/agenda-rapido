import type { ColumnDef } from "@tanstack/react-table";

export type Events = {
  id: number;
  title: string;
  status: number;
  date: string;
  time: string;
  client: number;
};

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "time",
    header: "Hora",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
