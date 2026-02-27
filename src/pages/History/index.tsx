import { useEffect, useState } from "react";

import { DATA_STATUS } from "@/data/status";
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

  // Função para atualizar o status de um evento, que será passada para a tabela via meta
  const updateStatus = (id: number, nextStatus: number) => {
    setData((prevData) => {
      // Mapeia os dados existentes
      const updated = prevData.map((event) => {
        if (event.id === id) {
          // Busca o novo nome do status baseado no ID
          const newStatusInfo = DATA_STATUS.find((s) => s.id === nextStatus);

          return {
            ...event,
            status: nextStatus,
            statusName: newStatusInfo ? newStatusInfo.name : event.statusName,
          };
        }
        return event;
      });

      // Filtra para manter apenas 1 e 2 na página de agendamento
      return updated.filter(
        (event) => event.status === 1 || event.status === 2,
      );
    });
  };

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
          <DataTable columns={columns} data={data} meta={{ updateStatus }} />
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default EventsPage;
