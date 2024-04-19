import client from "../../../api/config/client"

// Get clubs
export const getClubs = async () => {
    const url = '/clubs?state=in progress'
    return client.get(url)
}