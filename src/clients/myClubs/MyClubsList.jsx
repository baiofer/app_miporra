import { Link } from "react-router-dom"
import Button from "../../components/Button"

const MyClubsList = () => {

    return (
        <div>
            <p>Listado de porras del bar</p>
            <Link to="/miClubDetail">
                <Button type="primary-cta">Porra seleccionada</Button>
            </Link>
            <Link to="/myLotteriesList">
                <Button type="primary-cta">Listado de rifas</Button>
            </Link>
        </div>
    )
}

export default MyClubsList