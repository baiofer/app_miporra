import Button from "../components/Button"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setOrigin } from "../redux/reducers/originReducer"

const Logout = () => {

    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(setOrigin('user'))
    }

    return (
        <div>
            <p>Página de LOGOUT</p>
            <Link to="/porras">
                <Button type="primary-cta" onClick={handleOnClick}>Logout correcto</Button>
            </Link>
        </div>
    )
}

export default Logout