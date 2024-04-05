import clientJWT from "../../api/config/client"

// Create a bet
export const createBet = (bet) => {
    const url = "/newClubBet"
    return clientJWT.post(url, bet)
}