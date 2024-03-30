import { NavLink } from "react-router-dom";

function NavbarClient() {
  return (
    <div className="navBar">
      <NavLink to="/" className="navLink">
        Logo del cliente
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