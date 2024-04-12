import { useEffect, useState } from "react"
import FormInput from "../../components/FormInput"
import Button from "../../components/Button"
import PhotoSelector from "../../components/PhotoSelector"
import { updateClient } from "./service"
import { useDispatch, useSelector } from "react-redux"
import { setClientLogged, setOrigin } from "../../redux/reducers/authReducer"
import { useNavigate } from "react-router-dom"
import './Profile.css'
import ErrorComponent from "../../components/ErrorComponent"

const Profile = () => {

    const clientLogged = useSelector (state => state.origin.clientLogged)

    const [name, setName] = useState(clientLogged.name)
    const [logo, setLogo] = useState(clientLogged.logo)
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [clientUpdated, setClientUpdated] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFileSelected = (file) => {
        setLogo(file)
    }

    useEffect(() => {
        if (clientUpdated) {
            dispatch(setClientLogged(clientUpdated))
            dispatch(setOrigin('client'))
            navigate('/myClubsList')
        }
    }, [clientUpdated, dispatch, navigate])

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('logo', logo)
        try {
            // Update client
            setIsFetching(true)
            const clientData = await updateClient(formData)
            setIsFetching(false)
            console.log(clientData)
            setClientUpdated(clientData.results)
        } catch (error) {
            setIsFetching(false)
            console.log(error)
            setError(error)
        }
    }

    
    return (
        <div className="profile-container">
            <h2 className="profile-title">Confírmanos tus datos</h2>
            <form onSubmit={handleOnSubmit}>
                <FormInput 
                    type="text"
                    required
                    value={name}
                    onChange={ e => setName(e.target.value)}
                    label="Nombre del bar"
                    name="name"
                />
                <PhotoSelector 
                    onFileSelected={handleFileSelected}
                    previousImage={clientLogged.logo}
                />
                <Button variant="primary-cta">
                    {isFetching ? "Modificando tus datos ..." : "Modifica tus datos"}
                </Button>
                
            </form>
            { error && 
                <ErrorComponent errorText={error} />
            }
        </div>
    )
}

export default Profile