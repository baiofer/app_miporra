import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from '../../images/LOGO.png'
import './NavBarClient.css'

function NavbarClient() {

  const clientLogged = useSelector(state => state.origin.clientLogged)
  const logoPath = clientLogged.logo
  
  return (
    <div className="navBar">
      <NavLink to="/myClubsList" className="navLink">
        {
          logoPath !== '' ?
            <img className="logo" src={logoPath} alt="Logo del cliente" />
          :
            <img className="logo" src={logo} alt="Logo del cliente" />
        }
         
      </NavLink>
      <ul className="navBar-items">
        <NavLink to="/myClubsList" className="navLink">
          Mis Porras
        </NavLink>
        <NavLink to="/myLotteriesList" className="navLink">
          Mis Rifas
        </NavLink>
        <NavLink to="/validationsList" className="navLink">
          Validaciones
        </NavLink>
        <NavLink to="/profile" className="navLink">
          Mi Perfil
        </NavLink>
        <NavLink to="/logout" className="navLink">
          LOGOUT
        </NavLink>
      </ul>
    </div>
  );
}
export default NavbarClient;