import InfoTopPage from "@/components/layout/InfoTopPage";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";

const SchedulingPage = () => {
  return (
    <LayoutDefaultDesktop>
      <div>
        <InfoTopPage
          title="Agendamento"
          description="Página de agendamento de serviços"
        />
      </div>
    </LayoutDefaultDesktop>
  );
};

export default SchedulingPage;
