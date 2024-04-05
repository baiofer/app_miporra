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

const Register = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [logo, setLogo] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [clientCreated, setClientCreated] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFileSelected = (file) => {
        setLogo(file)
    }

    const resetError = () => {
        setError(null)
    }

    useEffect(() => {
        if (clientCreated) {
            dispatch(setClientLogged(clientCreated))
            dispatch(setOrigin('client'))
            navigate('/myClubsList')
        }
    }, [clientCreated, dispatch, navigate])

    const handleOnSubmit = async (event) => {
        event.preventDefault()
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
        <div>
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
                <PhotoSelector onFileSelected={handleFileSelected}
                />
                <Button variant="primary-cta">
                    {isFetching ? "Añadiendote a nuestra red ..." : "Unete a nuestra red"}
                </Button>
                { error && 
                    <div className="loginPage-errorContainer">
                        <div 
                            className="loginPage-error" 
                            onClick={resetError}
                        >{ error.message }, { error.error }</div>
                    </div>
                }
            </form>
        </div>
    )
}

export default Register