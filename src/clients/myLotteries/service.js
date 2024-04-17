import clientJWT from "../../api/config/client"

// Get lotteries
export const getLotteries = async () => {
    const url = '/lotteriesJwt'
    return clientJWT.get(url)
}

export const getInProgressLotteries = async () => {
    const url = '/lotteriesJwt?state=in progress'
    return clientJWT.get(url)
}

// Create a lottery
export const createLottery = (lottery) => {
    const url = "/newLottery"
    return clientJWT.post(url, lottery)
}

// Update a lottery
export const updateLottery = async (lottery, id) => {
    const url = ('/updateLottery/' + id)
    return clientJWT.put(url, lottery)
}

// Delete a lottery
export const deleteLottery = async (id) => {
    const url = ('/deleteLottery/' + id)
    return clientJWT.delete(url)
}

// Get lottery bets
export const getLotteryBets = async (lotteryId) => {
    const url = `/lotteryBetsJwt?LotteryId=${lotteryId}`
    return clientJWT.get(url)
}

