"use client";

import { useEffect, useState } from "react";

import { DATA_STATUS } from "@/data/status";
import { getEnrichedEvents } from "@/lib/events";

import { DataTable } from "@/components/layout/DataTable";
import EventsPageForm, {
  type EventData,
} from "@/components/layout/EventsPageForm";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import LoadingWarning from "@/components/layout/LoadingWarning";
import { Button } from "@/components/ui/button";

import { type Events, type TableMeta, columns } from "./columns";

const EventsPage = () => {
  const [data, setData] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Events | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        try {
          const savedEvents = localStorage.getItem("events");
          if (savedEvents) {
            setData(JSON.parse(savedEvents));
          } else {
            const allEvents = getEnrichedEvents([1, 2, 3]) as Events[];
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

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("events", JSON.stringify(data));
    }
  }, [data, loading]);

  const updateStatus = (id: string | number, nextStatus: number) => {
    setData((prevData) =>
      prevData.map((event) => {
        if (event.id === id) {
          const newStatusInfo = DATA_STATUS.find((s) => s.id === nextStatus);
          return {
            ...event,
            status: nextStatus,
            statusName: newStatusInfo ? newStatusInfo.name : event.statusName,
          };
        }
        return event;
      }),
    );
  };

  const handleDeleteEvent = (id: string | number) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleUpdateEvent = (updatedEvent: EventData) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === updatedEvent.id ? (updatedEvent as Events) : item,
      ),
    );
    setEditingEvent(null);
  };

  const filteredAndSortedData = data
    .filter((event) => event.status === 3)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare === 0) {
        return a.time.localeCompare(b.time);
      }
      return dateCompare;
    });

  return (
    <LayoutDefaultDesktop>
      <Header
        title="Histórico de Eventos"
        description="Acompanhe aqui todo seu histórico de eventos"
      />

      {editingEvent && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background border p-6 rounded-lg w-full max-w-lg shadow-2xl relative">
            <h2 className="text-xl font-bold mb-4">Editar Agendamento</h2>

            <EventsPageForm
              initialData={editingEvent as unknown as EventData}
              onSuccess={handleUpdateEvent}
            />

            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setEditingEvent(null)}
            >
              Cancelar Edição
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto">
        {loading ? (
          <LoadingWarning description="Carregando histórico..." />
        ) : (
          <DataTable
            columns={columns}
            data={filteredAndSortedData}
            meta={
              {
                updateStatus,
                onDelete: handleDeleteEvent,
                onEdit: (event: Events) => setEditingEvent(event),
              } as TableMeta
            }
          />
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default EventsPage;
