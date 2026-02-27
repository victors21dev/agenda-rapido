import { useEffect, useState } from "react";

import { DATA_STATUS } from "@/data/status";
import { getEnrichedEvents } from "@/lib/events";
import { Plus } from "lucide-react";

import AddSchedulingForm from "@/components/layout/AddSchedulingForm";
import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import LoadingWarning from "@/components/layout/LoadingWarning";
import Modal from "@/components/layout/Modal";
import { Button } from "@/components/ui/button";

import { type Events, columns } from "../History/columns";

const SchedulingPage = () => {
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
  // Filtra os eventos para mostrar apenas os que estão "Agendados" (1) ou "Em Andamento" (2)
  const filteredAndSortedData = data
    .filter((event) => event.status === 1 || event.status === 2)
    .sort((a, b) => {
      // Compara as datas
      const dateCompare = a.date.localeCompare(b.date);

      // Se a data for a mesma (0), desempata pelo horário
      if (dateCompare === 0) {
        return a.time.localeCompare(b.time);
      }

      return dateCompare;
    });

  return (
    <LayoutDefaultDesktop>
      {/* O Header é o título e descrição da página */}
      <div>
        <Header
          title="Agendamento"
          description="Página de agendamento de serviços"
        />
      </div>
      {/* Botão para abrir o modal de criação de novo agendamento */}
      <div className="flex py-4 justify-end">
        <Modal
          trigger={
            <div className="flex items-center gap-2">
              <Plus size={18} />
              Novo Agendamento
            </div>
          }
        >
          {(close) => (
            <div className="bg-background p-6 rounded-lg shadow-xl border w-100">
              <h2 className="text-xl font-bold mb-4">Novo agendamento</h2>

              <AddSchedulingForm
                onSuccess={(newEvent) => {
                  setData((prev) => [newEvent, ...prev]);
                  close();
                }}
              />

              <Button variant="ghost" className="w-full mt-2" onClick={close}>
                Cancelar
              </Button>
            </div>
          )}
        </Modal>
      </div>
      {/* A tabela de dados, que mostra os agendamentos filtrados. Passamos a */}
      {/* função de updateStatus via meta para ser usada nas ações da tabela */}
      <div className="container mx-auto">
        {loading ? (
          <LoadingWarning description="Carregando agendamentos" />
        ) : (
          <DataTable
            columns={columns}
            data={filteredAndSortedData}
            meta={{ updateStatus }}
          />
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default SchedulingPage;
