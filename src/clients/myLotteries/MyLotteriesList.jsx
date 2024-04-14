import './MyLotteriesList.css'
import { getLotteries } from "./service"
import { useEffect, useState } from "react"
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Lottery from '../../components/LotteryCard'

const MyLotteriesList = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [lotteries, setLotteries] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchLotteries = async () => {
            try {
                setIsFetching(true)
                const lotteriesList = await getLotteries()
                setLotteries(lotteriesList.results)
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

    const handleClick = (lottery) => {
        console.log(lottery)
        navigate('/myLotteryDetail', {state: { lottery } })
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
                                <Button key={lottery.id} onClick={() => handleClick(lottery)}>
                                    <Lottery lottery={ lottery } />
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