import { useNavigate } from 'react-router-dom'
import './Main.css'


const Main = () => {
    
    const navigate = useNavigate()
    return(
        <div className="main-container">
            <div className="main-club">
                <button className='main-club-button' onClick={() => navigate('/clubs')}>
                    <p>Porras</p>
                </button>
            </div>
            <div className="main-lottery">
            <button className='main-club-button' onClick={() => navigate('/lottery-bets')}>
                    <p>Rifas</p>
                </button>
            </div>
            <div className="main-home">
            <button className='main-club-button' onClick={() => navigate('/homepage')}>
                    <p>Home</p>
                </button>
            </div>
            <div className="main-client">
            <button className='main-club-button' onClick={() => navigate('/clients')}>
                    <p>Bares</p>
                </button>
            </div>
        </div>
    )
}

export default Main