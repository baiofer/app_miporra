import { useLocation } from "react-router-dom"
import Button from '../../components/Button'
import './MyLotteryDetail.css'
import LotteryCard from "../../components/LotteryCard"
import { useEffect, useState } from "react"
import { getLotteryBets, updateLottery } from "./service"
import ErrorComponent from "../../components/ErrorComponent"
import MessageComponent from "../../components/MessageComponent"
import { useNavigate } from 'react-router-dom'


const MyLotteryDetail = () => {

    const location = useLocation()
    const lottery = location.state.lottery

    const [result, setResult] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loteryBets, setLotteryBets] = useState([])

    const navigate = useNavigate()

    // Coger todas las apuestas de la rifa
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
        const winners = filterBySelectedNumber(loteryBets, result)
        if (winners.length === 0) {
            setMessage('NINGUN ACERTANTE EN ESTA RIFA.  (pulsa aqui para salir)')
        } else {
            // Close the lottery
            console.log(winners[0])
            const lotteryToUpdate = {

            }
            await updateLottery(lotteryToUpdate, winners[0].id)
            setMessage(`El ganador de la rifa ha sido ${winners[0].userEmail}`)
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
        <div className="myClubDetail-container">
            <Button className="myClubDetail-card">
                <LotteryCard lottery={ lottery } type="result" onChange={onChange}/>
            </Button>
            <div className="myClubDetail-button">
                <Button variant="primary-cta" onClick={handleClick}>{"Cierra la porra"}</Button>
            </div>
            <div className="myClubDetail-error" onClick={handleExit}>
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

export default MyLotteryDetail