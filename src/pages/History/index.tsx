import { getEnrichedEvents } from "@/lib/events";

import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";

import { type Events, columns } from "./columns";

const EventsPage = () => {
  // Trazer apenas os eventos com status 3 (concluído) para o histórico
  const data: Events[] = getEnrichedEvents([3]);
  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Histórico de Eventos"
          description="Acompanhe aqui todo seu histórico de eventos"
        />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </LayoutDefaultDesktop>
  );
};

export default EventsPage;
