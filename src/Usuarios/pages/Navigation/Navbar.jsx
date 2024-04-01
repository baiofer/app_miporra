import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navBar">
      <NavLink to="/homepage" className="navLink">
        Logo
      </NavLink>
      <ul className="navBar-items">
        <NavLink to="/clubs" className="navLink">
          Porra (QR)
        </NavLink>
        <NavLink to="/lottery-bets" className="navLink">
          Rifa (QR)
        </NavLink>
        <NavLink to="/clients" className="navLink">
          Encuentra tu bar
        </NavLink>
        <NavLink to="/login" className="navLink">
          Soy un bar
        </NavLink>
      </ul>
    </div>
  );
}
export default Navbar;
