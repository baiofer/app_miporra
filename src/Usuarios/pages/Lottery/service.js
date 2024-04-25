import { client } from "../../../api/config/client"

// Get lotteries
export const getLotteries = async () => {
    const url = '/lotteries?state=in progress'
    return client.get(url)
}