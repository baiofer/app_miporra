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

// Recove password
export const recovePass = (email, link) => {
    const url = (`/recovePassword?email=${email}&link=${link}`)
    return clientJWT.get(url)
}

// ResetPassword
export const resetPassword = (data) => {
    const url = ('/resetPassword')
    return clientJWT.post(url, data)
}