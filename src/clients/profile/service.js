import clientJWT from "../../api/config/client"

// Update a client
export const updateClient = client => {
    const url = ('/updateClient')
    return clientJWT.put(url, client)
}

// Delete a client
export const deleteClient = client => {
    const url = ('/deleteClient')
    return clientJWT.put(url, client)
}