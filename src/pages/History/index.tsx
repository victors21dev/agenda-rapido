import { useEffect, useState } from "react";

import { getEnrichedEvents } from "@/lib/events";

import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import LoadingWarning from "@/components/layout/LoadingWarning";

import { type Events, columns } from "./columns";

const EventsPage = () => {
  // Estado para armazenar eventos
  const [data, setData] = useState<Events[]>([]);
  // Estado para controle de carregamento (bom para UX de banco de dados)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      // O setTimeout deve envolver a lógica que define os dados
      setTimeout(() => {
        try {
          const result = getEnrichedEvents([3]);
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
          title="Histórico de Eventos"
          description="Acompanhe aqui todo seu histórico de eventos"
        />
      </div>
      <div className="container mx-auto">
        {loading ? (
          <LoadingWarning description="Carregando histórico" />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default EventsPage;
