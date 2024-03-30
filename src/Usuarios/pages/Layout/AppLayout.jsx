import { Outlet } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import Footer from '../Navigation/Footer';
import NavbarClient from '../../../clients/navigation/NavBarClient';

const AppLayout = ({ origin }) => {
  return (
    <>
      { origin === "clients" ? <NavbarClient /> : <Navbar />}
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
