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
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const resetError = () => {
        setError(null)
    }

    const handleOnClick = async () => {
        try {
            const token = await login({ email, password })
            Cookies.set('token', token, { secure: true, sameSite: 'Strict' });
            await setAuthorizationHeader(token)
            // Get client data
            const clientData = await getClient()
            // Store client data in redux
            dispatch(setClientLogged(clientData.results[0]))
            // Change the origin to reload the client navBar
            dispatch(setOrigin('client'))
            navigate('/myClubsList')
        } catch (error) {
            setError(error)
        }
        
    }

    const recovePassword = () => {

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
            <div style={{ marginBottom: '10px' }}>
                <Button onClick={recovePassword}>Olvidé mi contraseña</Button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <Button variant="primary-cta" onClick={handleOnClick}>Acceso</Button>
            </div>
            <p>¿No perteneces a nuestra red de bares? 
                <a href='/register' style={{ marginLeft: '20px' }}>Regístrate</a>
            </p>
            
            { error && 
                <div>
                    <div 
                        className="loginPage-error" 
                        onClick={resetError}
                    >{ error.message }, { error.error }</div>
                </div>
            }
        </div>
    )
}

export default Login