import { Calendar, CalendarClock, Clock, UserPlus } from "lucide-react";

import ItemSideBar from "./ItemSidebar";

const Sidebar = () => {
  return (
    <div className="bg-background h-full border-r-2 border-sidebar-border p-4 gap-4 flex flex-col">
      <div className="flex gap-2 items-center">
        <div className="font-bold text-md flex gap-2 items-center text-primary">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full border-2 border-primary-border">
            <img
              src="/noun-fast-848423.svg"
              alt="Ícone Rápido"
              className="w-6 h-6 invert"
            />
          </div>
          Agenda Rápido
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex flex-col mb-2">
            <div className="text-sm font-semibold text-foreground/70 mb-2">
              Gerenciamento
            </div>
            <hr />
          </div>
          <ItemSideBar
            icon={<Calendar size={16} />}
            label="Agendamentos"
            redirectPath="/agendamentos"
          />
        </div>
        <div>
          <div className="flex flex-col mb-2">
            <div className="text-sm font-semibold text-foreground/70 mb-2">
              Cadastros
            </div>
            <hr />
          </div>
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
    </div>
  );
};

export default Sidebar;
