import client from "../../../api/config/client"

// Get club bets
export const getClubs = async (clubId) => {
    const url = `/clubs?state=in progress&clientId=${clubId}`
    //const url = `/clubs?clientId=${clubId}`
    return client.get(url)
}

// Get lottery bets
export const getLotteries = async (lotteryId) => {
    const url = `/lotteries?state=in progress&clientId=${lotteryId}`
    //const url = `/lotteries?clientId=${lotteryId}`
    return client.get(url)
}