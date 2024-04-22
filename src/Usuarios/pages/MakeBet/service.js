import client from "../../../api/config/client"

// Get clubs
export const validateBet = async (bet) => {
    const url = '/newValidation'
    return client.post(url, bet)
}