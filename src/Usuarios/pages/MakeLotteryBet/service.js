import client from "../../../api/config/client"

// Validate lotteryBets
export const validateBet = async (bet) => {
    const url = '/newValidation'
    return client.post(url, bet)
}

// Get bets from a club
export const getBetsFromLottery = async (lotteryId) => {
    const url = (`/lotteryBets?lotteryId=${lotteryId}`)
    return client.get(url)
}