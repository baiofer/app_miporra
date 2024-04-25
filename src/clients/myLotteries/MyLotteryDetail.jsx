import { useLocation } from "react-router-dom"
import Button from '../../components/Button'
import './MyLotteryDetail.css'
import LotteryCard from "../../components/LotteryCard"
import { useEffect, useState } from "react"
import { getLotteryBets, updateLottery } from "./service"
import ErrorComponent from "../../components/ErrorComponent"
import MessageComponent from "../../components/MessageComponent"
import { useNavigate } from 'react-router-dom'
import results from '../../images/Resultados.svg'
import adelante from '../../images/adelante.svg'


const MyLotteryDetail = () => {

    const location = useLocation()
    const lottery = location.state.lottery

    const [result, setResult] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [lotteryBets, setLotteryBets] = useState([])
    const [lotteryUpdated, setLotteryUpdated] = useState(null)

    const navigate = useNavigate()

    // Get all bets of the Lottery
    useEffect(() => {
        const fetchLotteries = async () => {
            try {
                setIsFetching(true)
                const lotteryBetsList = await getLotteryBets(lottery.id)
                if (lotteryBetsList && lotteryBetsList.results) {
                    const sortedLotteries = lotteryBetsList.results.sort((a, b) => new Date(b.betDate) - new Date(a.betDate));
                    setLotteryBets(sortedLotteries)
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
        fetchLotteries()
    }, [])

    const filterBySelectedNumber = (bets, number) => {
        return bets.filter(bet => bet.selectedNumber === parseInt(number))
    };

    const handleClick = async () => {
        if (lotteryUpdated) navigate('/client')
        const winners = filterBySelectedNumber(lotteryBets, result)
        // Close the lottery
        const now = new Date()
        const closedAt = now.toLocaleString('es-ES')
        const lotteryToUpdate = {
            state: "finished",
            result: result,
            closedAt: closedAt,
            winner: winners[0]
        }
        const updated = await updateLottery(lotteryToUpdate,lottery.id)
        setLotteryUpdated(updated)
        if (winners.length === 0) {
            setMessage('Rifa cerrada. NINGUN ACERTANTE EN ESTA RIFA.')
        } else {
            setMessage(`Rifa cerrada. El ganador de la rifa ha sido ${winners[0].userEmail}`)
        }
    }

    const onChange = (result) => {
        // In result, the selection of winner number
        setResult(result)
    }

    const handleExit = () => {
        navigate('/client')
    }
   
    if (isFetching) return (
        <div>Cargando apuestas ...</div>
    )
    
    return(
        <div className="myLotteryDetail-first-container">
            <img src={results} alt='header' className="activeBetList-header-bet"/>
            <button className='back-image-button' onClick={ () => navigate('/client')}>
                <img className="clubs-image" src={adelante} alt="Atras" />
            </button>
            {
                isFetching ?
                    <div className="myClubDetail-fetching">Cargando porras ...</div>
                : null
            }
            <h2 className='myClubList-first-title'>Introduce los resultados</h2>
            <div className="myLotteryDetail-container">
                <Button className="myLotteryDetail-card">
                    <LotteryCard lottery={ lottery } type="result" onChange={onChange}/>
                </Button>
                <div className="myLotteryDetail-button">
                    <Button variant="primary-cta" onClick={handleClick}>{lotteryUpdated ? "Salir" : "Cierra la rifa"}</Button>
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
        </div>
    )
}

export default MyLotteryDetail