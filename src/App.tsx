import { BrowserRouter, Route, Routes } from "react-router";

import Scheduling from "./pages/Scheduling";

function App() {
  return (
    <BrowserRouter>
      <main className="flex flex-col w-full h-full">
        <Routes>
          <Route path="/agendamentos" element={<Scheduling />} />
          <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
