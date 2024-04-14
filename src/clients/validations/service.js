import clientJWT from "../../api/config/client"

// Get validations list
export const getValidations = () => {
    const url = "/validationsJwt"
    return clientJWT.get(url)
}

// Delete a validation
export const deleteValidation = (validationId) => {
    const url = `/deleteValidation/${validationId}`
    return clientJWT.delete(url)
}

// Create a clubBet
export const createClubBet = (clubBet) => {
    const url = "/newClubBet"
    return clientJWT.post(url, clubBet)
}

// Create a lotteryBet
export const createLotteryBet = (lotteryBet) => {
    const url = "/newLotteryBet"
    return clientJWT.post(url, lotteryBet)
}
