import clientJWT from "../../api/config/client"

// Update a client
export const updateClient = client => {
    console.log(client)
    const url = ('/updateClient')
    return clientJWT.put(url, client)
}