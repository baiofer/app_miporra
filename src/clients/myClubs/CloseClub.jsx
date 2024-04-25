import { useEffect, useState } from "react"
import { getInProgressClubs } from "./service"
import ClubCard from "../../components/ClubCard"
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ErrorComponent from "../../components/ErrorComponent"
import adelante from '../../images/adelante.svg'
import './CloseClub.css'
import bares from '../../images/Bares.svg'

const CloseClub = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [clubs, setClubs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const clubsList = await getInProgressClubs()
                const sortedClubs = clubsList.results.sort((a, b) => new Date(b.limitDateForBets) - new Date(a.limitDateForBets));
                setClubs(sortedClubs)
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

    const handleClick = (club) => {
        navigate('/myClubDetail', {state: { club } })
    }

    return (
        <div className="closeClub-first-container">
            <img src={bares} alt='header' className="activeBetList-header-bet"/>
            <button className='back-image-button' onClick={ () => navigate('/client')}>
                <img className="clubs-image" src={adelante} alt="Atras" />
            </button>
            {
                isFetching ?
                    <div className="closeClub-loading">Cargando porras ...</div>
                : null
            }
            {
                clubs.length === 0 ?
                    <h2 className='closeClub-title'>No tiene ninguna porra creada</h2>
                :
                    <h2 className='closeClub-title'>Mis porras</h2>
            }
            <div className="closeClub-clubsList">
                {
                    clubs ?
                        clubs.map( club => {
                            return(
                                <Button key={club.id} onClick={() => handleClick(club)}>
                                    <ClubCard club={ club } />
                                </Button>
                            )
                        })
                        :
                        <p>No hay ninguna porra creada</p>
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

export default CloseClub