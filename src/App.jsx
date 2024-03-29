import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./Usuarios/pages/Layout/AppLayout";
import PorrasPage from "./Usuarios/pages/Porras/PorrasPage";
import Button from "./components/Button";
import { ClubBets } from "./Usuarios/pages/ClubBets/ClubBets";
import { ClientsPage } from "./Usuarios/pages/Clients/ClientsPage";
import NextBets from "./Usuarios/pages/NextBets/NextBets";
import LotteryPage from "./Usuarios/pages/Lottery/Lottery";
import { Homepage } from "./components/Homepage";

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
          <Route path="lottery-bets" element={<LotteryPage />} />
          <Route path="homepage" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
