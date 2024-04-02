import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function NavbarClient() {

  const clientLogged = useSelector(state => state.clientLogged)

  const logoPath = clientLogged.clientLogged.logo
  console.log(clientLogged)
  console.log(logoPath)

  return (
    <div className="navBar">
      <NavLink to="/myClubsList" className="navLink">
        <img className="logoClient" src={logoPath} alt="Logo del cliente" /> 
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
        <NavLink to="/logout" className="navLink">
          LOGOUT
        </NavLink>
      </ul>
    </div>
  );
}
export default NavbarClient;