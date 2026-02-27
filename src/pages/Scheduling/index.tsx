import { getEnrichedEvents } from "@/lib/events";

import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";

import { type Events, columns } from "../History/columns";

const SchedulingPage = () => {
  // Trazer apenas os eventos com status 1 e 2 (agendado e em andamento) para o agendamento
  const data: Events[] = getEnrichedEvents([1, 2]);

  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Agendamento"
          description="Página de agendamento de serviços"
        />
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </LayoutDefaultDesktop>
  );
};

export default SchedulingPage;
