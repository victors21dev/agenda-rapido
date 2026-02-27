import type { ColumnDef } from "@tanstack/react-table";

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
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "genderName",
    header: "Gênero",
  },
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
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const dateValue = row.getValue("createdAt") as string;

      if (!dateValue) return "-";

      const dateOnly = dateValue.split("T")[0];
      const [year, month, day] = dateOnly.split("-");

      return `${day}/${month}/${year}`;
    },
  },
];
