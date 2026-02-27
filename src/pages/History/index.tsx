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

  // Quando entra na página, ele simula o carregamento dos dados do banco de dados
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      setTimeout(() => {
        try {
          const savedEvents = localStorage.getItem("events");

          if (savedEvents) {
            // Se já existem dados
            setData(JSON.parse(savedEvents));
          } else {
            // Se é a primeira vez, buscamos do Mock e salvamos tudo (IDs 1 a 5)
            // Aqui passamos todos os status [1, 2, 3] para o storage ter a base completa
            const allEvents = getEnrichedEvents([1, 2, 3]);
            setData(allEvents);
            localStorage.setItem("events", JSON.stringify(allEvents));
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    fetchData();
  }, []);
  // Sempre que os dados mudarem (ex: status atualizado), salvamos no localStorage para persistência
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("events", JSON.stringify(data));
    }
  }, [data, loading]);
  // Função para atualizar o status de um evento (ex: de "Agendado" para "Concluído")
  const updateStatus = (id: number, nextStatus: number) => {
    setData((prevData) => {
      return prevData.map((event) => {
        if (event.id === id) {
          const newStatusInfo = DATA_STATUS.find((s) => s.id === nextStatus);
          return {
            ...event,
            status: nextStatus,
            statusName: newStatusInfo ? newStatusInfo.name : event.statusName,
          };
        }
        return event;
      });
    });
  };
  // Filtra os eventos para mostrar apenas os que estão "Agendados" (3)
  const filteredData = data.filter((event) => event.status === 3);
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
          <DataTable
            columns={columns}
            data={filteredData}
            meta={{ updateStatus }}
          />
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default EventsPage;
