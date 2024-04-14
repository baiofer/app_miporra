import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setClientLogged, setOrigin } from '../redux/reducers/authReducer'
import { useEffect } from 'react'

const MiporraApp = () => {

    const clientLogged = useSelector (state => state.origin.clientLogged)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map( (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    const decodedToken = parseJwt(getCookie('token'));
    const isTokenExpired = decodedToken.exp < Date.now() / 1000

    useEffect(() => {
        if (isTokenExpired) {
            dispatch(setOrigin('user'))
            dispatch(setClientLogged({}))
            navigate('./porras')
        } else {
            if (clientLogged.id !== decodedToken.id) {
                dispatch(setOrigin('user'))
                dispatch(setClientLogged(null))
                navigate('/porras')
            } else {
                navigate('/client')
            }
        }
    }, [])
    

    return(
        null
    )
}

export default MiporraApp