import clientJWT from "../api/config/client"

export const login = async (credentials) => {
    const response = await clientJWT.post('/login', credentials)
    return response.token
}