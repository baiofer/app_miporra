import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setClientLogged, setOrigin } from "../redux/reducers/authReducer"
import { useEffect } from "react"
import { removeAuthorizationHeader } from "../api/config/client"


const Logout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    useEffect(() => {
        dispatch(setOrigin('user'));
        dispatch(setClientLogged({}))
        removeAuthorizationHeader()
        deleteCookie('token')
        navigate('/porras')
    }, [dispatch, navigate]);

    return (
        null
    )
}

export default Logout