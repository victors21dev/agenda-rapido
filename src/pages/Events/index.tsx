import { MOCK_EVENTS } from "@/mocks/event";

import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";

import { type Events, columns } from "./columns";

function getData(): Events[] {
  return MOCK_EVENTS;
}

const EventsPage = () => {
  const data = getData();
  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Eventos"
          description="Página de gerenciamento de eventos"
        />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </LayoutDefaultDesktop>
  );
};

export default EventsPage;
