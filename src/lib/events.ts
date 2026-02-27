// src/lib/events.ts
import { DATA_STATUS } from "@/data/status";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { MOCK_EVENTS } from "@/mocks/event";
import { type Events } from "@/pages/History/columns";

export function getEnrichedEvents(statusList: number[]): Events[] {
  // Filtrar pelos status passados no array
  const filteredEvents = MOCK_EVENTS.filter((event) =>
    statusList.includes(event.status),
  );

  // Ordenação em (ASC)
  const sortedEvents = filteredEvents.sort((a, b) =>
    a.time.localeCompare(b.time),
  );

  // Mapeamento e enriquecimento dos eventos com nome do cliente e status
  return sortedEvents.map((event) => {
    const clientInfo = MOCK_CLIENTS.find((c) => c.id === event.client);
    const statusInfo = DATA_STATUS.find((s) => s.id === event.status);

    return {
      ...event,
      clientName: clientInfo ? clientInfo.name : "Desconhecido",
      statusName: statusInfo ? statusInfo.name : "Sem Status",
    };
  }) as Events[];
}
