/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import NavbarClient from "../../../clients/navigation/NavBarClient";
import { useSelector } from "react-redux";
import { useBadgesContext } from "../../../context/BadgesContext";
import { useEffect } from "react";
import { client } from "../../../api/config/client";

const AppLayout = () => {
  const origin = useSelector((state) => state.origin.origin);
  const { setCurrentBadges, setIsLoadingBadges } = useBadgesContext();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setIsLoadingBadges(true);
        const { data } = await client.get("/badges");
        setCurrentBadges(data.results);

        console.log(data);
        setIsLoadingBadges(false);
      } catch (error) {
        setIsLoadingBadges(false);
        console.log(error);
      }
    };
    fetchBadges();
  }, []);

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
