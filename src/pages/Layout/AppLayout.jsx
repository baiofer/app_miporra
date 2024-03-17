import { Outlet } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
