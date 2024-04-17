import { NavLink } from "react-router-dom";
import logo from '../../../images/LOGO.png'
import './Navbar.css'
import menu from '../../../images/menu.png'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'


function Navbar() {

  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClubBets = ()=> {
    setIsMenuOpen(false)
    navigate("/clubs")
  }

  const handleLotteryBets = ()=> {
    setIsMenuOpen(false)
    navigate("/lottery-bets")
  }

  const handleClients = ()=> {
    setIsMenuOpen(false)
    navigate("/clients")
  }

  return (
    <div className="navBar">
      <NavLink to="/homepage" className="navLink">
        <img className="logo" src={logo} alt="Logo" />
      </NavLink>
      <ul className="navBar-items">
        <button className="navLink" onClick={handleMenu} >
          <img src={menu} alt="Icono de menú" className="navBar-menu" />
        </button>
        {
          isMenuOpen && (
            <div className="menu-container">
              <button onClick={handleClubBets} className="menu-item">
                Apostar
              </button>
              <button onClick={handleLotteryBets} className="menu-item">
                Rifas
              </button>
              <button onClick={handleClients} className="menu-item">
                Encuentra tu bar
              </button>
            </div>
          )
        }  
        <NavLink to="/login" className="navLink">
          <span className="navLoginContainer">
            Soy un bar
          </span>
        </NavLink>
      </ul>
    </div>
  );
}
export default Navbar;
