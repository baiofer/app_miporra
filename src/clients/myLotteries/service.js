import clientJWT from "../../api/config/client"

// Get lotteries
export const getLotteries = async () => {
    const url = '/lotteriesJwt'
    return clientJWT.get(url)
}

// Create a lottery
export const createLottery = (lottery) => {
    const url = "/newLottery"
    return clientJWT.post(url, lottery)
}

// Update a lottery
export const updateLottery = async (lottery, id) => {
    const url = ('/updateLottery', id)
    return clientJWT.put(url, lottery)
}

// Delete a lottery
export const deleteLottery = async (lottery, id) => {
    const url = ('/deleteLottery', id)
    return clientJWT.delete(url, lottery)
}


