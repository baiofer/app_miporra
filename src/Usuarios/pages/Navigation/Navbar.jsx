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
	<div className="navBar-container">
		<NavLink to="/homepage" className="navLink">
			<img className="navBar-logo" src={logo} alt="Logo" />
		</NavLink>
		<div>
			<button className="navBar-navLink" onClick={handleMenu} >
				<img src={menu} alt="Icono de menú" className="navBar-menu" />
			</button>
			{
				isMenuOpen && (
				<div className="navBar-menu-container">
					<button onClick={handleClubBets} className="mavBar-menu-item">
						Apostar
					</button>
					<button onClick={handleLotteryBets} className="navBar-menu-item">
						Rifas
					</button>
					<button onClick={handleClients} className="navBar-menu-item">
						Encuentra tu bar
					</button>
				</div>
				)
			}
			<NavLink to="/login" className="navBar-navLink">
				<span className="navBar-navLoginContainer">
					Soy un bar
				</span>
			</NavLink>
		</div>
	</div>
  );
}
export default Navbar;
