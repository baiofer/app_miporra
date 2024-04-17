import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setClientLogged, setOrigin } from '../redux/reducers/authReducer'
import { useEffect } from 'react'
import { getClient } from '../authorization/service'
import { setAuthorizationHeader } from '../api/config/client'

const MiporraApp = () => {

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

    const token = getCookie('token');
    let decodedToken = null
    let isTokenExpired = null

    if (token) {
        decodedToken = parseJwt(token);
        isTokenExpired = decodedToken.exp < Date.now() / 1000
    } else {
        navigate('/porras')
    }
    

    useEffect(() => {
        if (token) {
            if (isTokenExpired) {
                dispatch(setOrigin('user'))
                dispatch(setClientLogged({}))
                console.log('Token expired')
                navigate('./porras')
            } else {
                handleClient()
                navigate('/client')
            }
        } else {
            console.log('There is not a token.')
            navigate('/porras')
        }
        
    }, [])
    
    const handleClient = async () => {
        await setAuthorizationHeader(getCookie('token'));
        const client = await getClient()
        console.log('There is a token. Client: ', client.results[0])
        dispatch(setOrigin('client'))
        dispatch(setClientLogged(client.results[0]))
    }

    return(
        null
    )
}

export default MiporraApp