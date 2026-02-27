import { BrowserRouter, Route, Routes } from "react-router";

import { ThemeProvider } from "./components/layout/ThemeProvider";
import BusinessHoursPage from "./pages/BusinessHours";
import ClientsPage from "./pages/Clients";
import EventsPage from "./pages/Events";
import Scheduling from "./pages/Scheduling";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <main className="flex bg-background flex-col w-full h-full text-foreground poppins-regular">
          <Routes>
            <Route path="/agendamentos" element={<Scheduling />} />
            <Route path="/eventos" element={<EventsPage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/funcionamento" element={<BusinessHoursPage />} />
            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
