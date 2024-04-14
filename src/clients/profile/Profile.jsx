import { useEffect, useState } from "react"
import FormInput from "../../components/FormInput"
import Button from "../../components/Button"
import PhotoSelector from "../../components/PhotoSelector"
import { deleteClient, updateClient } from "./service"
import { useDispatch, useSelector } from "react-redux"
import { setClientLogged, setOrigin } from "../../redux/reducers/authReducer"
import { useNavigate } from "react-router-dom"
import './Profile.css'
import ErrorComponent from "../../components/ErrorComponent"
import { removeAuthorizationHeader } from "../../api/config/client"

const Profile = () => {

    const clientLogged = useSelector (state => state.origin.clientLogged)

    const [name, setName] = useState(clientLogged.name)
    const [logo, setLogo] = useState(null)
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
            setClientUpdated(clientData.results)
        } catch (error) {
            setIsFetching(false)
            console.log(error)
            setError(error)
        }
    }

    const deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    const handleDelete = async () => {
        // Delete client
        await deleteClient(clientLogged.id)
        console.log('cliente borrado')
        // Delete token
        deleteCookie('token')
        console.log('cookie borrado')
        // Delete Authoritation in Axios
        removeAuthorizationHeader()
        console.log('axios borrado')
        // Delete redux
        dispatch(setOrigin('user'))
        dispatch(setClientLogged({}))
        console.log('redux borrado')
        navigate('/miporra-app')
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
                <div className="profile-selections">
                    <Button variant="primary-cta">
                        {isFetching ? "Modificando tus datos ..." : "Modifica tus datos"}
                    </Button>
                    <Button variant="primary-cta" type='button' onClick={handleDelete}>
                        Elimíname de la red de bares
                    </Button>
                </div>
            </form>
            { error && 
                <ErrorComponent errorText={error} />
            }
        </div>
    )
}

export default Profile