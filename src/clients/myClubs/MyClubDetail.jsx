import { useLocation } from "react-router-dom"
import ClubCard from "../../components/ClubCard"
import Button from '../../components/Button'
import './MyClubDetail.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBetsFromClub, updateClub } from "./service"
import ErrorComponent from "../../components/ErrorComponent"
import MessageComponent from "../../components/MessageComponent"


const MyClubDetail = () => {

    const location = useLocation()
    const club = location.state.club

    const [match1HomeResult, setMatch1HomeResult] = useState(0)
    const [match1AwayResult, setMatch1AwayResult] = useState(0)
    const [match2HomeResult, setMatch2HomeResult] = useState(0)
    const [match2AwayResult, setMatch2AwayResult] = useState(0)
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [clubBets, setClubBets] = useState([])
    const [clubUpdated, setClubUpdated] = useState(null)

    const navigate = useNavigate()

    // Get all bets of the club
    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const clubBetsList = await getBetsFromClub(club.id)
                console.log(clubBetsList)
                if (clubBetsList && clubBetsList.results) {
                    const sortedClubs = clubBetsList.results.sort((a, b) => new Date(b.betDate) - new Date(a.betDate));
                    setClubBets(sortedClubs)
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
        if (error || message) {
          const timer = setTimeout(() => {
            setError(null);
            setMessage(null)
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        }
    }, [error]);

    const filterByResults = (bets, number1, number2, number3, number4) => {
        let winners = []
        bets.forEach( bet => {
            if (parseInt(bet.match1HomeTeamResult) === parseInt(number1) && parseInt(bet.match1AwayTeamResult) === parseInt(number2) && parseInt(bet.match2HomeTeamResult) === parseInt(number3) && parseInt(bet.match2AwayTeamResult) === parseInt(number4)) {
                winners.push(bet)
            }
        })
        return winners
    };

    const handleClick = async (event) => {
        event.preventDefault()
        if (clubUpdated) navigate('/client')
        const winners = filterByResults(clubBets, match1HomeResult, match1AwayResult, match2HomeResult, match2AwayResult)
        // Close the club
        const now = new Date()
        const closedAt = now.toLocaleString('es-ES')
        const clubToUpdate = {
            //state: "finished",
            match1HomeTeamResult: match1HomeResult,
            match1AwayTeamResult: match1AwayResult,
            match2HomeTeamResult: match2HomeResult,
            match2AwayTeamResult: match2AwayResult,
            state: "finished",
            closedAt: closedAt,
            winners: winners,
            numberOfWinners: winners.length,
            accumulatedPrize: clubBets.length * club.betPrice
        }
        const updated = await updateClub(clubToUpdate,club.id)
        setClubUpdated(updated)
        if (winners.length === 0) {
            setMessage('Porra cerrada. NINGUN ACERTANTE EN ESTA PORRA.')
        } else {
            const art = winners.length === 1 ? "El ganador de la porra ha sido" : "Los ganadores de la porra han sido"
            const theWinners = winners.map(winner => winner.userEmail).join(', ');
            setMessage(`Porra cerrada. ${art} ${theWinners}.`)
        }
    }

    const onChange = (result1, result2, result3, result4) => {
        // In result, the selection of winner number
        setMatch1HomeResult(result1)
        setMatch1AwayResult(result2)
        setMatch2HomeResult(result3)
        setMatch2AwayResult(result4)
    }

    const handleExit = () => {
        navigate('/client')
    }
   
    if (isFetching) return (
        <div>Cargando apuestas ...</div>
    )
    
    return(
        <div className="myClubDetail-container">
            <Button className="myClubDetail-card">
                <ClubCard club={ club } type="result" onChange={onChange}/>
            </Button>
            <div className="myClubDetail-button">
                <Button variant="primary-cta" onClick={handleClick}>{clubUpdated ? "Salir" : "Cierra la porra"}</Button>
            </div>
            <div className="myLotteryDetail-error" onClick={handleExit}>
                {error && (
                    <div>
                        <ErrorComponent errorText={error.message} />
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

export default MyClubDetail