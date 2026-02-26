import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
