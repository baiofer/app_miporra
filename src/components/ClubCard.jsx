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

const ClubCard = ({ club, type="", onChange }) => {

    const clientLogged = useSelector (state => state.origin.clientLogged)
    let logo 
    if (clientLogged.logo) {
        logo = clientLogged.logo
    } else {
        logo = club.client.logo
    }

    const [result1Home, setResult1Home] = useState(0)
    const [result1Away, setResult1Away] = useState(0)
    const [result2Home, setResult2Home] = useState(0)
    const [result2Away, setResult2Away] = useState(0)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por lo que añadimos 1
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleChange = (res, num) => {
        switch (num) {
            case 1:
                setResult1Home(res)
                onChange(res, result1Away, result2Home, result2Away)
                break
            case 2:
                setResult1Away(res)
                onChange(result1Home, res, result2Home, result2Away)
                break
            case 3:
                setResult2Home(res)
                onChange(result1Home, result1Away, res, result2Away)
                break
            case 4:
                setResult2Away(res)
                onChange(result1Home, result1Away, result2Home, res)
                break
        }
    }

    const price = parseInt(club.accumulatedPrize) + parseInt(club.accumulatedJackpot)

    const borderColor = club.state === 'in progress' ? 'var(--primary-green-light)' : 'var(--secondary-light)'
    const backgroundColor = club.state === 'in progress' ? 'var(--secondary-white)' : 'var(--secondary-light)'
    
    return (
        <div className='club-container' style={{ borderColor: borderColor, backgroundColor: backgroundColor}}>
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
                        onChange={e => handleChange(e.target.value, 1)}
                        min="0"
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.match1HomeTeamResult}</p>
                    <BadgeElement name={club.match1HomeTeam} className="club-badge"/>
                    <img src={separator} alt="separador" className='club-separator' />
                    <BadgeElement name={club.match1AwayTeam} />
                    <input className='club-input-result' 
                        type="number"
                        name="result"
                        value={result1Away}
                        onChange={e => handleChange(e.target.value, 2)}
                        min="0"
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.match1AwayTeamResult}</p>
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
                        onChange={e => handleChange(e.target.value, 3)}
                        min="0"
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.match2HomeTeamResult}</p>
                    <BadgeElement name={club.match2HomeTeam} className="club-badge"/>
                    <img src={separator} alt="separador" className='club-separator' />
                    <BadgeElement name={club.match2AwayTeam} />
                    <input className='club-input-result' 
                        type="number"
                        name="result"
                        value={result2Away}
                        onChange={e => handleChange(e.target.value, 4)}
                        min="0"
                        label="Resultado"
                        style={{ visibility: type === "result" && club.state === "in progress" ? "visible" : "hidden"}}
                    />
                    <p className='club-finished'>{club.match2AwayTeamResult}</p>
                </div>
                {
                    club.state === "in progress" ?
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
                    :
                        <div className='club-end-line'>
                            <p className='club-end-line-label'>Estado: </p>
                            <p className='club-end-line-value'>{club.state === "in progress" ? "Activa" : "Cerrada"}</p>
                            <p className='club-end-line-label'>Premio: </p> 
                            <p className='club-end-line-value'>{price}€</p>
                            <p className='club-end-line-label'>Ganadores: </p> 
                            <p className='club-end-line-value'>{club.winners.length}</p>
                        </div>
                }
                
                
            </div>
        </div>
    )
}

export default ClubCard