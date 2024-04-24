import client from "../../../api/config/client"

// Get clubs
export const validateBet = async (bet) => {
    const url = '/newValidation'
    return client.post(url, bet)
}

// Get bets from a club
export const getBetsFromClub = async (clubId) => {
    const url = (`/clubBets?clubId=${clubId}`)
    return client.get(url)
}