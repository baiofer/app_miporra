import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navBar">
      <NavLink to="/" className="navLink">
        Logo
      </NavLink>
      <ul className="navBar-items">
        <NavLink to="/club-bets" className="navLink">
          Apuestas
        </NavLink>
        <NavLink to="/next-bets" className="navLink">
          Próximos sorteos
        </NavLink>
        <NavLink to="/lottery-bets" className="navLink">
          Rifas
        </NavLink>
        <NavLink to="/clients" className="navLink">
          Bares
        </NavLink>
      </ul>
    </div>
  );
}
export default Navbar;
