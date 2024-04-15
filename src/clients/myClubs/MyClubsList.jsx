import './MyClubsList.css'
import { getClubs } from "./service"
import { useEffect, useState } from "react"
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ClubCard from '../../components/ClubCard'

const MyClubsList = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [clubs, setClubs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const clubsList = await getClubs()
                setClubs(clubsList.results)
                setIsFetching(false)
            } catch (error) {
                setIsFetching(false)
                setError(error)
                console.log(error) 
            }
        }
        fetchClubs()
    }, [])

    const resetError = () => {
        setError(null)        
    }

    const handleClick = (club) => {
        console.log(club)
        navigate('/myClubDetail', {state: { club } })
    }

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

export default MyClubsList