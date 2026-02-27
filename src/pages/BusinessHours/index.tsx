import { useEffect, useState } from "react";

import { MOCK_HOURS_OPEN_CLOSE } from "@/mocks/time-list-open-close";

import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import LoadingWarning from "@/components/layout/LoadingWarning";
import { Input } from "@/components/ui/input";

const BusinessHoursPage = () => {
  const [hours, setHours] = useState<typeof MOCK_HOURS_OPEN_CLOSE>([]);
  const [loading, setLoading] = useState(true);

  // Carregamento Inicial: Busca os horários do localStorage ou usa o Mock
  useEffect(() => {
    const fetchHours = () => {
      setLoading(true);
      setTimeout(() => {
        try {
          const savedHours = localStorage.getItem("business_hours");

          if (savedHours) {
            setHours(JSON.parse(savedHours));
          } else {
            // Se não houver nada salvo, inicia com o Mock
            setHours(MOCK_HOURS_OPEN_CLOSE);
            localStorage.setItem(
              "business_hours",
              JSON.stringify(MOCK_HOURS_OPEN_CLOSE),
            );
          }
        } catch (error) {
          console.error("Erro ao carregar horários:", error);
        } finally {
          setLoading(false);
        }
      }, 800);
    };

    fetchHours();
  }, []);

  // Persistência Automática: Salva sempre que 'hours' mudar
  useEffect(() => {
    if (!loading && hours.length > 0) {
      localStorage.setItem("business_hours", JSON.stringify(hours));
    }
  }, [hours, loading]);

  // Manipulação de Horários: Atualiza o estado quando o usuário altera um horário
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
            <div className="grid grid-cols-3 gap-4 mb-2 text-xs font-bold uppercase text-primary border-b pb-2">
              <span>Dia</span>
              <span>Abertura</span>
              <span>Fechamento</span>
            </div>

            {hours.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 items-center gap-4"
              >
                <div className="text-sm font-medium text-muted-foreground">
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
          </>
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default BusinessHoursPage;
