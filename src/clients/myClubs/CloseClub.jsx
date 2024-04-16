import { useEffect, useState } from "react"
import { getInProgressClubs } from "./service"
import ClubCard from "../../components/ClubCard"
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

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

    const handleClick = (club) => {
        navigate('/myClubDetail', {state: { club } })
    }

    const resetError = () => {
        setError(null)        
    }

    // Al seleccionar una porra, voy al detail a cerrarla
    if (isFetching) return (
        <div>Loading ...</div>
    )

    return (
        <div>
            <h2>Mis porras</h2>
            <div>
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
                { error && <div onClick={resetError}>{ error.message }</div>}
            </div>

        </div>
    )
}

export default CloseClub