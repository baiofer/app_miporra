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
import Client from "./clients/client/Client";
import MyClubsList from "./clients/myClubs/MyClubsList";
import MyClubDetail from "./clients/myClubs/MyClubDetail";
import MyLotteriesList from "./clients/myLotteries/MyLotteriesList";
import MyLotteryDetail from "./clients/myLotteries/MyLotteryDetail";
import ValidationsList from "./clients/validations/ValidationsList";
import Logout from "./authorization/Logout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Homepage } from "./Usuarios/pages/Homepage/Homepage";
import { Clubs } from "./Usuarios/pages/Clubs/Clubs";
import { MakeBet } from "./Usuarios/pages/MakeBet/MakeBet";
import Profile from "./clients/profile/Profile";
import ResetPassword from "./authorization/ResetPassword";
import { ActiveBets } from "./Usuarios/pages/ActiveBets/ActiveBets";
import { MakeLotteryBet } from "./Usuarios/pages/MakeLotteryBet/MakeLotteryBet";
import CreateClub from "./clients/myClubs/CreateClub";
import CreateLottery from "./clients/myLotteries/CreateLottery";
import CloseClub from "./clients/myClubs/CloseClub";
import CloseLottery from "./clients/myLotteries/CloseLottery";
import { ClientDetail } from "./Usuarios/pages/Clients/ClientDetail";
import GenerateQR from "./components/GenerateQR";
import MiporraApp from "./clients/MiporraApp";
import ClubBetsList from "./clients/myClubs/ClubBetsList";
import LotteryBetsList from "./clients/myLotteries/LotteryBetsList";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="miporra-app" />} />
            <Route path="miporra-app" element={<MiporraApp />} />
            <Route path="porras" element={<PorrasPage />} />
            <Route path="club-bets" element={<ClubBets />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="next-bets" element={<NextBets />} />
            <Route path="lottery-bets" element={<LotteryPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="logout" element={<Logout />} />
            <Route path="client" element={<Client />} />
            <Route path="createClub" element={<CreateClub />} />
            <Route path="createLottery" element={<CreateLottery />} />
            <Route path="generateQR" element={<GenerateQR />} />
            <Route path="closeClub" element={<CloseClub />} />
            <Route path="closeLottery" element={<CloseLottery />} />
            <Route path="myClubsList" element={<MyClubsList />} />
            <Route path="myClubDetail" element={<MyClubDetail />} />
            <Route path="myLotteriesList" element={<MyLotteriesList />} />
            <Route path="myLotteryDetail" element={<MyLotteryDetail />} />
            <Route path="clubBetsList" element={<ClubBetsList />} />
            <Route path="validationsList" element={<ValidationsList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="make-bet" element={<MakeBet />} />
            <Route path="active-bets" element={<ActiveBets />} />
            <Route path="make-lottery-bet/:id" element={<MakeLotteryBet />} />
            <Route path="client-detail/:id" element={<ClientDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
