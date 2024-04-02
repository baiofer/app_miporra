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