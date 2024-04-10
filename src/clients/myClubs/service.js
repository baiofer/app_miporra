import clientJWT from "../../api/config/client"

// Get clubs
export const getClubs = async () => {
    const url = '/clubsJwt'
    return clientJWT.get(url)
}

// Create a club
export const createClub = () => {
    const url = "/newClub"
    return clientJWT.post(url)
}

// Update a club
export const updateClub = (client, id) => {
    const url = ('/updateClub', id)
    return clientJWT.put(url, client)
}

// Delete a club
export const deleteClub = (client, id) => {
    const url = ('/deleteClub', id)
    return clientJWT.delete(url, client)
}


