import clientJWT from "../api/config/client"

// Login
export const login = async (credentials) => {
    const response = await clientJWT.post('/login', credentials)
    return response.token
}

// Get client data
export const getClient = () => {
    const url = "/clientsJwt"
    return clientJWT.get(url)
}

// Add new client
export const createClient = client => {
    const url = ('/newClient')
    return clientJWT.post(url, client)
}