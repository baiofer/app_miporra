/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import NavbarClient from "../../../clients/navigation/NavBarClient";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const origin = useSelector((state) => state.origin.origin);

  return (
    <>
      {origin === "client" ? <NavbarClient /> : <Navbar />}
      <div className="container">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
