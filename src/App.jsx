import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/Layout/AppLayout";
import PorrasPage from "./pages/Porras/PorrasPage";
import Button from "./components/Button";
import { ClubBets } from "./pages/ClubBets/ClubBets";
import { ClientsPage } from "./pages/Clients/ClientsPage";
import NextBets from "./pages/NextBets/NextBets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="porras" />} />
          <Route path="porras" element={<PorrasPage />} />
          <Route path="club-bets" element={<ClubBets />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="next-bets" element={<NextBets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
