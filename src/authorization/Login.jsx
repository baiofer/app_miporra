import Button from '../components/Button.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setOrigin } from "../redux/reducers/originReducer"
import FormInput from '../components/FormInput.jsx'
import { useState } from 'react'
import { client } from '../api/config/client.js'
import Cookies from 'js-cookie'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOnClick = async () => {
        console.log(email, password)
        const token = await client.post('/login', { email, password })
        setToken(token.data.token)
        Cookies.set('token', token.data.token, { secure: true, sameSite: 'Strict' });
        console.log('Token: ', token.data.token)
        dispatch(setOrigin('client'))
        navigate('/myClubsList')
    }

    return (
        <div>
            <p>Página LOGIN</p>
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
            <p>Token: { token }</p>
        </div>
    )
}

export default Login