import { Link } from "react-router-dom"
import Button from "../../components/Button"

const MyClubsList = () => {

    const handleClick = () => {
        console.log('Click')
    }
    return (
        <div>
            <div style={{ display: 'block' }}>
                <p>Listado de porras del bar</p>
                <div style={{ marginTop: '10px '}}>
                    <Link to="/miClubDetail">
                        <Button variant="primary-cta">Porra seleccionada</Button>
                    </Link>
                </div>
                <div style={{ marginTop: '10px '}}>
                    <Link to="/myLotteriesList">
                        <Button variant="primary-cta" onClick={handleClick}>Listado de rifas</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MyClubsList