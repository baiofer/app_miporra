import { useNavigate } from 'react-router-dom'
import './Main.css'
import participaPorra from '../../../images/Apuesta_ahora_en_tu_bar_home.svg'
import participaRifa from '../../../images/Participa_en_rifa.svg'
import queEsMiporra from '../../../images/Que_es_mi_porra.svg'
import encuentraBar from '../../../images/Encuentra_bar.svg'


const Main = () => {
    
    const navigate = useNavigate()
    return(
        <div className="main-container">
            <div className="main-club">
                <button className='main-club-button' onClick={() => navigate('/clubs')}>
                    <img className="homepage-header" src={participaPorra} alt='Cabecera' />
                </button>
            </div>
            <div className="main-lottery">
            <button className='main-club-button' onClick={() => navigate('/lottery-bets')}>
                <img className="homepage-header" src={participaRifa} alt='Cabecera' />
                </button>
            </div>
            <div className="main-home">
            <button className='main-club-button' onClick={() => navigate('/homepage')}>
                <img className="homepage-header" src={queEsMiporra} alt='Cabecera' />
            </button>
            </div>
            <div className="main-client">
            <button className='main-club-button' onClick={() => navigate('/clients')}>
                <img className="homepage-header" src={encuentraBar} alt='Cabecera' />
            </button>
            </div>
        </div>
    )
}

export default Main