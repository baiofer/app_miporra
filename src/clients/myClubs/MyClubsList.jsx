import './MyClubsList.css'
import { getClubs } from "./service"
import { useEffect, useState } from "react"
import { Button } from '@mui/material'
import ClubCard from '../../components/ClubCard'
import ErrorComponent from '../../components/ErrorComponent'
import adelante from '../../images/adelante.svg'
import { useNavigate } from 'react-router-dom'
import bares from '../../images/Bares.svg'


const MyClubsList = () => {

    const navigate = useNavigate()

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const clubsList = await getClubs()
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

    const handleList = (club) => {
        navigate('/clubBetsList', { state: { club } })
    }

    return (
        <div className='myClubList-first-container'>
            <img src={bares} alt='header' className="activeBetList-header-bet"/>
            <button className='back-image-button' onClick={ () => navigate('/client')}>
                <img className="clubs-image" src={adelante} alt="Atras" />
            </button>
            {
                isFetching ?
                    <div className='myClubsList-fetching'>Cargando porras ...</div>
                : null
            }
            {
                clubs.length === 0 ?
                    <h2 className='myClubList-first-title'>No tiene ninguna porra creada</h2>
                :
                    <h2 className='myClubList-first-title'>Mis porras</h2>
            }
            <div className='myClubList-clubs-list'>
                {
                    clubs ?
                        clubs.map( club => {
                            return(
                                <Button key={club.id} onClick={() => handleList(club)}>
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

export default MyClubsList