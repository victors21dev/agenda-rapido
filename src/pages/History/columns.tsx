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
    accessorKey: "clientName",
    header: "Cliente",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const dateValue = row.getValue("date") as string;
      const [year, month, day] = dateValue.split("-");

      return `${day}/${month}/${year}`;
    },
  },
  {
    accessorKey: "time",
    header: "Hora",
  },
  {
    accessorKey: "statusName",
    header: "Status",
  },
];
