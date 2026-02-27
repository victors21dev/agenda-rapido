import { MOCK_CLIENTS } from "@/mocks/clients";

import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";

import { type Clients, columns } from "./columns";

function getData(): Clients[] {
  return MOCK_CLIENTS;
}

const ClientsPage = () => {
  const data = getData();
  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Clientes"
          description="Página para cadastro de clientes e gerenciamento de informações"
        />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </LayoutDefaultDesktop>
  );
};

export default ClientsPage;
