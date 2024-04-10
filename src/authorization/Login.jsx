import Button from '../components/Button.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setClientLogged, setOrigin } from "../redux/reducers/authReducer.jsx"
import FormInput from '../components/FormInput.jsx'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { getClient, login } from './service.js'
import { setAuthorizationHeader } from '../api/config/client.js'
import './Login.css'
import { recovePass } from './service.js'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const resetError = () => {
        setError(null)
    }

    const resetMessage = () => {
        setMessage(null)
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

    const recovePassword = async () => {
        try {
            if (email !== "") {
                const link = "http://localhost:5173/resetPassword"
                const result = await recovePass(email, link)
                if (result === 'Email enviado') {
                    setMessage(`Se ha enviado un correo electrónico a la dirección ${email} con las instrucciones necesarias para resetear su contraseña.`)
                } else {
                    setMessage(`Este email no está registrado en nuestro sistema. Puedes seleccionar la opción "Regístrate"`)
                }
            } else {
                setMessage(`Introduzca una dirección de email válida`)
            }
        } catch (error) {
            setError(error)
        }
        
    }

    return (
        <div className='login-container'>
            <h2>Soy un bar</h2>
            <FormInput 
                className='loginInput'
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
            { message && 
                <div>
                    <div 
                        className="loginPage-message" 
                        onClick={resetMessage}
                    >{ message }</div>
                </div>
            }
        </div>
    )
}

export default Login