import { Link } from "react-router-dom"
import Button from "../../components/Button"

const MyLotteriesList = () => {

    return (
        <div>
            <div style={{ display: 'block' }}>
                <p>Listado de rifas</p>
                <div style={{ marginTop: '10px '}}>
                    <Link to="/myLotteryDetail">
                        <Button variant="primary-cta">Rifa seleccionada</Button>
                    </Link>
                </div>
                <div style={{ marginTop: '10px '}}>
                    <Link to="/myClubsList">
                        <Button variant="primary-cta">Listado de porras</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MyLotteriesList