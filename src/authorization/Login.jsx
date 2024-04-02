import Button from '../components/Button.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setClientLogged, setOrigin } from "../redux/reducers/authReducer.jsx"
import FormInput from '../components/FormInput.jsx'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { getClient, login } from './service.js'
import { setAuthorizationHeader } from '../api/config/client.js'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOnClick = async () => {
        const token = await login({ email, password })
        Cookies.set('token', token, { secure: true, sameSite: 'Strict' });
        await setAuthorizationHeader(token)
        dispatch(setOrigin('client'))
        // Get client data
        const clientData = await getClient()
        console.log(clientData.results[0])
        dispatch(setClientLogged(clientData.results[0]))
        navigate('/myClubsList')
    }

    return (
        <div>
            <h2>Soy un bar</h2>
            <FormInput 
                type="text"
                required
                value={email}
                onChange={ e => setEmail(e.target.value)}
                label="Email"
                name="email"
            />
            <FormInput 
                type="password"
                required
                value={password}
                onChange={ e => setPassword(e.target.value)}
                label="Contraseña"
                name="password"
            />
            <Button type="primary-cta" onClick={handleOnClick}>Acceso</Button>
        </div>
    )
}

export default Login