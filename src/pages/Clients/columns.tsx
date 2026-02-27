import type { ColumnDef } from "@tanstack/react-table";

export type Clients = {
  id: number;
  name: string;
  birth: string;
  phone: string;
  email: string;
  gender: number;
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
    accessorKey: "gender",
    header: "Gênero",
  },
  {
    accessorKey: "birth",
    header: "Data de Nascimento",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
