/* eslint-disable react/prop-types */
import Button from '../../components/Button'
import './Validations.css'
import { useLocation } from 'react-router-dom'
import { createBet } from './service'
import { useState } from 'react'

const ValidationsList = () => {

    const location = useLocation()
    const club = location.state.club

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    
    const createNewBet = async () => {
        const bet = {
            clubId: club.id,
            userEmail: "fjarilla@gmail.com",
            userName: "Fernando",
            match1HomeTeamResult: 1,
            match1AwayTeamResult: 2,
            match2HomeTeamResult: 3,
            match2AwayTeamResult: 4,
            betDate: "2024-04-04",
            betPrice: 2
        }
        await createBet(bet)
        try {
            setIsFetching(true)
            const newBet = await createBet(bet)
            setIsFetching(false)
        } catch (error) {
            setIsFetching(false)
            setError(error)
            console.log(error) 
        }
    }
    
    return (
        <div>
            <h2>Apuesta</h2>
            {
                <Button variant="primary-cta" onClick={createNewBet}>Haz apuesta</Button>
            }
            
        </div>
    )
}

export default ValidationsList