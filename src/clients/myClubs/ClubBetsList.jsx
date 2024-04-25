/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getBetsFromClub } from "./service"
import { useLocation, useNavigate } from 'react-router-dom'
import './ClubBetsList.css'
import adelante from '../../images/adelante.svg'
import ErrorComponent from "../../components/ErrorComponent"
import MessageComponent from "../../components/MessageComponent"
import results from '../../images/Resultados.svg'

const ClubBetsList = () => {

    const location = useLocation()
    const club = location.state.club

    const navigate = useNavigate()

    const [isFetching, setIsFetching] = useState(false)
    const [bets, setBets] = useState([])
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const clubsList = await getBetsFromClub(club.id)
                if (clubsList && clubsList.results) {
                    const sortedClubs = clubsList.results.sort((a, b) => new Date(b.limitDateForBets) - new Date(a.limitDateForBets));
                    setBets(sortedClubs)
                } else {
                    setMessage('No hay apuestas realizadas en esta rifa.');
                }
                setIsFetching(false)
            } catch (error) {
                setIsFetching(false)
                setError(error)
                console.log(error) 
            }
        }
        fetchClubs()
    }, [])

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError(null);
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        }
    }, [error]);

    

    return(
        <div className="activeBetList-first-container">
            <img src={results} alt='header' className="activeBetList-header-bet"/>
            <button className='back-image-button' onClick={ () => navigate('/myClubsList')}>
                <img className="clubs-image" src={adelante} alt="Atras" />
            </button>
            {
                isFetching ?
                    <div className="clubBetsList-loading">Cargando apuestas ...</div>
                : null
            }
            <h2 className="activeBetList-title">Apuestas activas</h2>
            <div className="clubBetsList-container">
                <div className="clubBetsList-line">
                    <div className="clubBetsList-">
                        <p className="clubBetsList-title">Nombre</p>
                    </div> 
                    <div className="clubBetsList-match">
                        <p className="clubBetsList-title">
                            {club.match1HomeTeam}
                        </p>
                        <p className="clubBetsList-title-club">
                            {club.match1AwayTeam}
                        </p>
                    </div>
                    <div className="clubBetsList-match">
                        <p className="clubBetsList-title">
                            {club.match2HomeTeam}
                        </p>
                        <p className="clubBetsList-title-club">
                            {club.match2AwayTeam}
                        </p>
                    </div>
                </div>
                <div className="clubBetsList-divisor" />
                {
                    bets.map( bet => {
                        return(
                            <div className="clubBetsList-line" key={bet.id}>
                                <div className="clubBetsList-name">
                                    <p className="clubBetsList-line">{ bet.userName }</p>
                                </div>
                                <div className="clubBetsList-result">
                                    <p className="clubBetsList-line">{bet.match1HomeTeamResult} - {bet.match1AwayTeamResult}</p>
                                </div>
                                <div className="clubBetsList-result">
                                    <p className="clubBetsList-line">{bet.match2HomeTeamResult} - {bet.match2AwayTeamResult}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="clubBetsList-divisor" />
                <div className="clubBetsList-price">
                    <p>Premio acumulado:</p>
                    <p className="clubBetsList-total">{club.betPrice * bets.length}</p>
                </div>
                <div className="clubBetsList-price-jackpot">
                    <p>Bote:</p>
                    <p className="clubBetsList-total">{club.accumulatedJackpot}</p>
                </div>
                {error && (
                    <div>
                        <ErrorComponent errorText={error} />
                    </div>
                )}
                {message && (
                    <div>
                        <MessageComponent messageText={message} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClubBetsList