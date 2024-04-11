import { useEffect, useState } from "react"
import FormInput from "../components/FormInput"
import Button from "../components/Button"
import PhotoSelector from "../components/PhotoSelector"
import { createClient, login } from "./service"
import Cookies from "js-cookie"
import { setAuthorizationHeader } from "../api/config/client"
import { useDispatch } from "react-redux"
import { setClientLogged, setOrigin } from "../redux/reducers/authReducer"
import { useNavigate } from "react-router-dom"
import './Register.css'
import ErrorComponent from "../components/ErrorComponent"

const Register = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [logo, setLogo] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [clientCreated, setClientCreated] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFileSelected = (file) => {
        setLogo(file)
    }

    useEffect(() => {
        if (clientCreated) {
            dispatch(setClientLogged(clientCreated))
            dispatch(setOrigin('client'))
            navigate('/myClubsList')
        }
    }, [clientCreated, dispatch, navigate])

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError(null);
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        }
      }, [error]);

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError('El correo electrónico no es válido.');
            return;
        }
        // Validate password length
        if (password.length < 6) {
            setError('El password debe contener al menos 6 caracteres.');
            return;
        }
        // Validate password
        if (password !== repeatPassword) {
            setError('Las dos contraseñas deben coincidir.');
            return;
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('logo', logo)
        try {
            // Create client
            setIsFetching(true)
            const clientData = await createClient(formData)
            setIsFetching(false)
            // Login client
            const token = await login({ email, password })
            Cookies.set('token', token, { secure: true, sameSite: 'Strict' });
            await setAuthorizationHeader(token)
            setClientCreated(clientData.results)
        } catch (error) {
            setIsFetching(false)
            setError(error)
        }
    }

    
    return (
        <div className="register-container">
            <h2>Unete a nuestra red de bares</h2>
            <form onSubmit={handleOnSubmit}>
                <FormInput 
                    type="text"
                    required
                    value={name}
                    onChange={ e => setName(e.target.value)}
                    label="Nombre del bar"
                    name="name"
                />
                <FormInput 
                    type="text"
                    required
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                    label="Tu email"
                    name="email"
                />
                <FormInput 
                    type="password"
                    required
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    label="Tu contraseña"
                    name="password"
                />
                <FormInput 
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={ e => setRepeatPassword(e.target.value)}
                    label="Repite tu contraseña"
                    name="repeatPassword"
                />
                <PhotoSelector onFileSelected={handleFileSelected}
                />
                <div className="register-access">
                    <Button variant="primary-cta">
                        {isFetching ? "Añadiendote a nuestra red ..." : "Unete a nuestra red"}
                    </Button>
                </div>
                
                <p className="register-login">¿Ya perteneces a nuestra red? 
                    <a className="register-login-a" href='/login' style={{ marginLeft: '20px' }}>Inicia sesión</a>
                </p>
                { error && 
                    <div>
                        <ErrorComponent errorText={error} />
                    </div>
                }
            </form>
        </div>
    )
}

export default Register