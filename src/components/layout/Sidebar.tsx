import {
  Calendar,
  CalendarClock,
  CalendarRange,
  Clock,
  UserPlus,
} from "lucide-react";

import ItemSideBar from "./ItemSidebar";

const Sidebar = () => {
  return (
    <div className="bg-sidebar h-full border-r-2 border-sidebar-border p-4 gap-4 flex flex-col">
      <div className="flex gap-2 items-center">
        <div className="font-bold text-lg flex gap-2 items-center">
          <CalendarRange />
          AGENDA-RÁPIDO
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <ItemSideBar
          icon={<Calendar size={16} />}
          label="Agendamentos"
          redirectPath="/agendamentos"
        />
        <ItemSideBar
          icon={<CalendarClock size={16} />}
          label="Eventos"
          redirectPath="/eventos"
        />
        <ItemSideBar
          icon={<UserPlus size={16} />}
          label="Clientes"
          redirectPath="/clientes"
        />
        <ItemSideBar
          icon={<Clock size={16} />}
          label="Funcionamento"
          redirectPath="/funcionamento"
        />
      </div>
    </div>
  );
};

export default Sidebar;
