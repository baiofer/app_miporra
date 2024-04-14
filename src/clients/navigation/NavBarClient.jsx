import { NavLink } from "react-router-dom";
import logo from '../../images/LOGO.png'
import perfil from '../../images/perfil.svg'
import './NavBarClient.css'
import ValidationButton from "../../components/ValidationButton";

function NavbarClient() {
  
  return (
    <div className="navBar">
      <NavLink to="/client" className="navLink">
        <img className="logo" src={logo} alt="Logo del sitio" />
      </NavLink>
      <ul className="navBar-items">
        <NavLink to="/validationsList" className="navLink">
          <ValidationButton />
        </NavLink>
        <NavLink to="/profile" className="navLink">
          <img className="navBar-profile" src={perfil} alt="Logo del cliente" />
        </NavLink>
        <NavLink to="/logout" className="navLink">
          <p className="navBar-exit">Salir</p>
        </NavLink>
      </ul>
    </div>
  );
}
export default NavbarClient;