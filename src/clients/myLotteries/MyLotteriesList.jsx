import './MyLotteriesList.css'
import { getLotteries } from "./service"
import { useEffect, useState } from "react"
import { Button } from '@mui/material'
import LotteryCard from '../../components/LotteryCard'

const MyLotteriesList = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [lotteries, setLotteries] = useState([])

    useEffect(() => {
        const fetchLotteries = async () => {
            try {
                setIsFetching(true)
                const lotteriesList = await getLotteries()
                const sortedLotteries = lotteriesList.results.sort((a, b) => new Date(b.dateOfLottery) - new Date(a.dateOfLottery));
                setLotteries(sortedLotteries)
                setIsFetching(false)
            } catch (error) {
                setIsFetching(false)
                setError(error)
                console.log(error) 
            }
        }
        fetchLotteries()
    }, [])

    const resetError = () => {
        setError(null)        
    }

    if (isFetching) return (
        <div>Loading ...</div>
    )

    return (
        <div>
            <h2>Mis rifas</h2>
            <div>
                {
                    lotteries ?
                        lotteries.map( lottery => {
                            return(
                                <Button key={lottery.id}>
                                    <LotteryCard key={lottery.id} lottery={ lottery } />
                                </Button>
                            )
                        })
                        :
                        <p>No hay ninguna rifa creada</p>
                }
                { error && <div onClick={resetError}>{ error.message }</div>}
            </div>

        </div>
    )
}

export default MyLotteriesList