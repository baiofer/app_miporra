import clientJWT from "../../api/config/client"

// Get clubs
export const getClubs = async () => {
    const url = '/clubsJwt'
    return clientJWT.get(url)
}

// Create a club
export const createClub = (club) => {
    const url = "/newClub"
    return clientJWT.post(url, club)
}

// Update a club
export const updateClub = async (client, id) => {
    const url = ('/updateClub', id)
    return clientJWT.put(url, client)
}

// Delete a club
export const deleteClub = async (client, id) => {
    const url = ('/deleteClub', id)
    return clientJWT.delete(url, client)
}

// Get teams badges
export const getTeams = async () => {
    const url = ('/badges')
    return clientJWT.get(url)
}


