/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getBetsFromClub } from "./service"

const ClubBetsList = ({ clubId }) => {

    console.log('Id: ', clubId)

    const [isFetching, setIsFetching] = useState(false)
    const [bets, setBets] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const clubsList = await getBetsFromClub(clubId)
                const sortedClubs = clubsList.results.sort((a, b) => new Date(b.limitDateForBets) - new Date(a.limitDateForBets));
                setBets(sortedClubs)
                setIsFetching(false)
            } catch (error) {
                setIsFetching(false)
                setError(error)
                console.log(error) 
            }
        }
        fetchClubs()
    }, [])

    console.log('Apuestas: ', bets)
    return(
        <div>

        </div>
    )
}

export default ClubBetsList