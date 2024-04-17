import './MyLotteriesList.css'
import { getLotteries } from "./service"
import { useEffect, useState } from "react"
import { Button } from '@mui/material'
import LotteryCard from '../../components/LotteryCard'
import ErrorComponent from '../../components/ErrorComponent'

const MyLotteriesList = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [lotteries, setLotteries] = useState([])

    useEffect(() => {
        const fetchLotteries = async () => {
            try {
                setIsFetching(true)
                const lotteriesList = await getLotteries()
                console.log(lotteriesList.results)
                const sortedLotteries = lotteriesList.results.sort((a, b) => new Date(b.dateLimitOfBets) - new Date(a.dateLimitOfBets));
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
                {error && (
                    <div>
                        <ErrorComponent errorText={error} />
                    </div>
                )}
            </div>

        </div>
    )
}

export default MyLotteriesList