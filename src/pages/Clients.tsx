import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";

const ClientsPage = () => {
  return (
    <LayoutDefaultDesktop>
      <div>
        <Header
          title="Clientes"
          description="Página para cadastro de clientes e gerenciamento de informações"
        />
      </div>
    </LayoutDefaultDesktop>
  );
};

export default ClientsPage;
