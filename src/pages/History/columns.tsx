import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface TableMeta {
  updateStatus: (id: string | number, nextStatus: number) => void;
  onEdit: (event: Events) => void;
  onDelete: (id: string | number) => void;
}

export type Events = {
  id: string | number;
  title: string;
  status: number;
  date: string;
  time: string;
  client: number;
  clientName: string;
  statusName: string;
};

export const columns: ColumnDef<Events>[] = [
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
    cell: ({ row }) => {
      const status = row.original.status;
      const statusName = row.original.statusName;

      const statusStyles: Record<number, string> = {
        1: "bg-yellow-100 text-yellow-800 border-yellow-200",
        2: "bg-blue-100 text-blue-800 border-blue-200",
        3: "bg-green-100 text-green-800 border-green-200",
      };

      return (
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
            statusStyles[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {statusName}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const event = row.original;
      const meta = table.options.meta as TableMeta;
      const updateStatus = meta?.updateStatus;

      const handleStatusChange = () => {
        let nextStatus = event.status;
        if (event.status === 1) nextStatus = 2;
        else if (event.status === 2) nextStatus = 3;
        console.log(event);

        if (updateStatus) {
          updateStatus(event.id, nextStatus);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{event.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleStatusChange}>
              {event.status === 1
                ? "Marcar como Em Andamento"
                : event.status === 2
                  ? "Marcar como Concluído"
                  : "Status Finalizado"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => meta?.onEdit(event)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => meta?.onDelete(event.id)}
            >
              Apagar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
