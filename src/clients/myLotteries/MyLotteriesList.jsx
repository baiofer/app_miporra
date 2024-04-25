import './MyLotteriesList.css'
import { getLotteries } from "./service"
import { useEffect, useState } from "react"
import { Button } from '@mui/material'
import LotteryCard from '../../components/LotteryCard'
import ErrorComponent from '../../components/ErrorComponent'
import adelante from '../../images/adelante.svg'
import bares from '../../images/Bares.svg'
import { useNavigate } from 'react-router-dom'

const MyLotteriesList = () => {

    const navigate = useNavigate()

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

    

    return (
        <div className='myLotteriesList-first-container'>
            <img src={bares} alt='header' className="activeBetList-header-bet"/>
            <button className='back-image-button' onClick={ () => navigate('/client')}>
                <img className="clubs-image" src={adelante} alt="Atras" />
            </button>
            {
                isFetching ?
                    <div className='myLotteriesList-loading'>Cargando rifas ...</div>
                : null
            }
            {
                lotteries.length === 0 ?
                    <h2 className='myClubList-title'>No tiene ninguna rifa creada</h2>
                :
                    <h2 className='myClubList-title'>Mis rifas</h2>
            }
            <div className='myLotteriesList-container'>
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