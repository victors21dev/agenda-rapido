import { useEffect, useState } from "react";

import { getEnrichedClients } from "@/lib/clients";

import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import LoadingWarning from "@/components/layout/LoadingWarning";

import { type Clients, columns } from "./columns";

const ClientsPage = () => {
  // Estado para armazenar eventos
  const [data, setData] = useState<Clients[]>([]);
  // Estado para controle de carregamento (bom para UX de banco de dados)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      // O setTimeout deve envolver a lógica que define os dados
      setTimeout(() => {
        try {
          const result = getEnrichedClients();
          setData(result);
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        } finally {
          setLoading(false);
        }
      }, 1000); // 1000ms = 1 segundo de "loading"
    };

    fetchData();
  }, []);
  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Clientes"
          description="Página para cadastro de clientes e gerenciamento de informações"
        />
      </div>
      <div className="container mx-auto">
        {loading ? (
          <LoadingWarning description="Carregando clientes" />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default ClientsPage;
