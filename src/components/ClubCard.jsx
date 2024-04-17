/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import './ClubCard.css'
import BadgeElement from './BadgeElement'
import separator from '../images/separador.svg'
import { useState } from 'react'

{/* 
    type puede tener tres estados
    type="" o sin type: card sin resultados
    type="result": Card con input para introducir resultados
    type="finished": Card con los resultados fijos.
*/}

const ClubCard = ({ club, type="" }) => {

    const clientLogged = useSelector (state => state.origin.clientLogged)
    const logo = clientLogged.logo

    const [result1Home, setResult1Home] = useState(0)
    const [result1Away, setResult1Away] = useState(0)
    const [result2Home, setResult2Home] = useState(0)
    const [result2Away, setResult2Away] = useState(0)

    const borderColor = club.state === 'in progress' ? 'green' : 'red'

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por lo que añadimos 1
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className='club-container' style={{ borderColor: borderColor}}>
            <div className='club-betZone'>
                <div className='club-header'>
                    <div className='club-header-date'>
                        <p className='club-end-line-label'>Límite apuestas: </p>
                        <p className='club-end-line-value'>{formatDate(club.limitDateForBets)} / {club.limitHourForBets}</p>
                    </div>
                    <img src={ logo } alt='Logo del bar' className='club-imgContainer'/>    
                </div>
                <div className='club-divisor' />
                {/* PARTIDO 1 */}
                <div className='club-match'>
                    <div className='club-date'>
                        <p className='club-date-text'>{formatDate(club.match1Date)}</p>
                        <p className='club-date-text'>{club.match1Hour}</p>
                    </div>
                    <input className='club-input-result' 
                        type="number"
                        name="result"
                        value={result1Home}
                        onChange={e => setResult1Home(e.target.value)}
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.result1Home}</p>
                    <BadgeElement name={club.match1HomeTeam} className="club-badge"/>
                    <img src={separator} alt="separador" className='club-separator' />
                    <BadgeElement name={club.match1AwayTeam} />
                    <input className='club-input-result' 
                        type="number"
                        name="result"
                        value={result1Away}
                        onChange={e => setResult1Away(e.target.value)}
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.result1Away}</p>
                </div>
                {/* PARTIDO 2 */}
                <div className='club-match'>
                    <div className='club-date'>
                        <p className='club-date-text'>{formatDate(club.match1Date)}</p>
                        <p className='club-date-text'>{club.match1Hour}</p>
                    </div>
                    <input className='club-input-result' 
                        type="number"
                        name="result"
                        value={result2Home}
                        onChange={e => setResult2Home(e.target.value)}
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.result2Home}</p>
                    <BadgeElement name={club.match2HomeTeam} className="club-badge"/>
                    <img src={separator} alt="separador" className='club-separator' />
                    <BadgeElement name={club.match2AwayTeam} />
                    <input className='club-input-result' 
                        type="number"
                        name="result"
                        value={result2Away}
                        onChange={e => setResult2Away(e.target.value)}
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.result2Away}</p>
                </div>
                <div className='club-end-line'>
                    <p className='club-end-line-label'>Estado: </p>
                    <p className='club-end-line-value'>{club.state === "in progress" ? "Activa" : "Cerrada"}</p>
                    <p className='club-end-line-label'>Apuesta: </p> 
                    <p className='club-end-line-value'>{club.betPrice}€</p>
                    {
                        club.jackpot ? 
                            <div>
                                <p className='club-end-line-label'>Bote: </p>
                                <p className='club-end-line-value'>{club.jackpot}€</p>
                            </div> 
                        : null
                    }
                    
                </div>
                
            </div>
        </div>
    )
}

export default ClubCard