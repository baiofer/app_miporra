/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./Usuarios/pages/Layout/AppLayout";
import PorrasPage from "./Usuarios/pages/Porras/PorrasPage";
import Button from "./components/Button";
import { ClubBets } from "./Usuarios/pages/ClubBets/ClubBets";
import { ClientsPage } from "./Usuarios/pages/Clients/ClientsPage";
import NextBets from "./Usuarios/pages/NextBets/NextBets";
import LotteryPage from "./Usuarios/pages/Lottery/Lottery";

import Login from "./authorization/Login";
import Register from "./authorization/Register";
import MyClubsList from "./clients/myClubs/MyClubsList";
import MyClubDetail from "./clients/myClubs/MyClubDetail";
import MyLotteriesList from "./clients/myLotteries/MyLotteriesList";
import MyLotteryDetail from "./clients/myLotteries/MyLotteryDetail";
import ValidationsList from "./clients/validations/ValidationsList";
import Logout from "./authorization/Logout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Homepage } from "./Usuarios/pages/Homepage/Homepage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="porras" />} />
            <Route path="porras" element={<PorrasPage />} />
            <Route path="club-bets" element={<ClubBets />} />
            <Route path="clubs" element={<Bets />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="next-bets" element={<NextBets />} />
            <Route path="lottery-bets" element={<LotteryPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<Logout />} />
            <Route path="myClubsList" element={<MyClubsList />} />
            <Route path="miClubDetail" element={<MyClubDetail />} />
            <Route path="myLotteriesList" element={<MyLotteriesList />} />
            <Route path="myLotteryDetail" element={<MyLotteryDetail />} />
            <Route path="validationsList" element={<ValidationsList />} />
            <Route path="homepage" element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
