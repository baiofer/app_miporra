import Button from "../components/Button"
import { Link } from 'react-router-dom'

const Login = () => {

    return (
        <div>
            <p>Página LOGIN</p>
            <Link to="/myClubsList">
                <Button type="primary-cta">Login correcto</Button>
            </Link>
        </div>
    )
}

export default Login