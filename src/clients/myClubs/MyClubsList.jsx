import './MyClubsList.css'
import { getClubs } from "./service"
import { useEffect, useState } from "react"
import Club from "../../components/ClubCard"

const MyClubsList = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const clubsList = await getClubs()
                console.log(clubsList)
                setClubs(clubsList.results)
                setIsFetching(false)
            } catch (error) {
                setIsFetching(false)
                setError(error)
                console.log(error) 
            }
        }
        fetchClubs()
        console.log('Clubs: ', clubs)
    }, [])

    const resetError = () => {
        setError(null)        
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
                                <Club club={ club } key={ club.id }/>
                                
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