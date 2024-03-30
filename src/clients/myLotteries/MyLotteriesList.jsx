import { Link } from "react-router-dom"
import Button from "../../components/Button"

const MyLotteriesList = () => {

    return (
        <div>
            <p>Listado de rifas</p>
            <Link to="/myLotteryDetail">
                <Button type="primary-cta">Rifa seleccionada</Button>
            </Link>
            <Link to="/myClubsList">
                <Button type="primary-cta">Listado de porras</Button>
            </Link>
        </div>
    )
}

export default MyLotteriesList