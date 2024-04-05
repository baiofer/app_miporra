import { NavLink } from "react-router-dom";
import logo from '../../../images/LOGO.png'
import './Navbar.css'

function Navbar() {
  return (
    <div className="navBar">
      <NavLink to="/homepage" className="navLink">
        <img className="logo" src={logo} alt="Logo" />
      </NavLink>
      <ul className="navBar-items">
        <NavLink to="/clubs" className="navLink">
          Apostar
        </NavLink>
        <NavLink to="/lottery-bets" className="navLink">
          Rifas
        </NavLink>
        <NavLink to="/clients" className="navLink">
          Encuentra tu bar
        </NavLink>
        <NavLink to="/login" className="navLink">
          <span className="loginContainer">
            Soy un bar
          </span>
        </NavLink>
      </ul>
    </div>
  );
}
export default Navbar;
