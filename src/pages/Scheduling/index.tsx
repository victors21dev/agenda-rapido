import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";

import { type Payment, columns } from "./columns";

function getData(): Payment[] {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

const SchedulingPage = () => {
  const data = getData();

  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Agendamento"
          description="Página de agendamento de serviços"
        />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </LayoutDefaultDesktop>
  );
};

export default SchedulingPage;
