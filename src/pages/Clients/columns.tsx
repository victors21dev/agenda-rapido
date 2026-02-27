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
  onEdit: (client: Clients) => void;
  onDelete: (id: number) => void;
  // Ajustado para bater exatamente com o erro: obrigatório e id como number
  updateStatus: (id: number, nextStatus: number) => void;
}

export type Clients = {
  id: number;
  name: string;
  birth: string;
  phone: string;
  email: string;
  gender: number;
  genderName?: string;
  createdAt: string;
};

export const columns: ColumnDef<Clients>[] = [
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "genderName", header: "Gênero" },
  {
    accessorKey: "birth",
    header: "Data de Nascimento",
    cell: ({ row }) => {
      const dateValue = row.getValue("birth") as string;
      if (!dateValue) return "-";
      const [year, month, day] = dateValue.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  { accessorKey: "phone", header: "Telefone" },
  { accessorKey: "email", header: "Email" },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const client = row.original;
      const meta = table.options.meta as TableMeta;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => meta?.onEdit(client)}>
              Editar Cliente
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => meta?.onDelete(client.id)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
