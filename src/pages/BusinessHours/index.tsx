import { useEffect, useState } from "react";

import { MOCK_HOURS_OPEN_CLOSE } from "@/mocks/time-list-open-close";

import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import LoadingWarning from "@/components/layout/LoadingWarning";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BusinessHoursPage = () => {
  // Estado com os dados do mock
  const [hours, setHours] = useState<typeof MOCK_HOURS_OPEN_CLOSE>([]);
  const [loading, setLoading] = useState(true);

  // Atualizar horário
  const handleTimeChange = (
    id: number,
    field: "open" | "close",
    value: string,
  ) => {
    setHours((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value || null } : item,
      ),
    );
  };

  useEffect(() => {
    const fetchHours = () => {
      setLoading(true);

      // Simula o tempo de resposta do servidor
      setTimeout(() => {
        try {
          setHours(MOCK_HOURS_OPEN_CLOSE);
        } catch (error) {
          console.error("Erro ao carregar horários:", error);
        } finally {
          setLoading(false);
        }
      }, 800);
    };

    fetchHours();
  }, []);

  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Funcionamento"
          description="Aqui você pode configurar os horários de funcionamento do seu negócio."
        />
      </div>

      <div className="flex flex-col gap-3 max-w-md p-6 rounded-lg">
        {loading ? (
          <LoadingWarning description="Carregando horários de funcionamento..." />
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-2 text-xs font-bold uppercase text-slate-500 border-b pb-2">
              <span>Dia</span>
              <span>Abertura</span>
              <span>Fechamento</span>
            </div>

            {hours.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 items-center gap-4"
              >
                <div className="text-sm font-medium text-slate-700">
                  {item.dayweek.split("-")[0]}
                </div>

                <Input
                  type="time"
                  value={item.open || ""}
                  onChange={(e) =>
                    handleTimeChange(item.id, "open", e.target.value)
                  }
                  className="w-full h-9"
                />

                <Input
                  type="time"
                  value={item.close || ""}
                  onChange={(e) =>
                    handleTimeChange(item.id, "close", e.target.value)
                  }
                  className="w-full h-9"
                />
              </div>
            ))}

            <Button
              onClick={() => console.log("Dados salvos:", hours)}
              className="mt-4 w-fit"
            >
              Salvar Horários
            </Button>
          </>
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default BusinessHoursPage;
