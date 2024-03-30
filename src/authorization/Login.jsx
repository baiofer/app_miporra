import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setOrigin } from "../redux/reducers/originReducer"

const Login = () => {

    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(setOrigin('client'))
    }

    return (
        <div>
            <p>Página LOGIN</p>
            <Link to="/myClubsList">
                <Button type="primary-cta" onClick={handleOnClick}>Login correcto</Button>
            </Link>
        </div>
    )
}

export default Login