import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setOrigin } from "../redux/reducers/originReducer"
import { useEffect } from "react"
import { removeAuthorizationHeader } from "../api/config/client"

const Logout = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    dispatch(setOrigin('user'))
    useEffect(() => {
        dispatch(setOrigin('user'));
        navigate('/porras')
        removeAuthorizationHeader()
    }, [dispatch, navigate]);

    return (
        null
    )
}

export default Logout