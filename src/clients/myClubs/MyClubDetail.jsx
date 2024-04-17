import { useLocation } from "react-router-dom"
import ClubCard from "../../components/ClubCard"
import Button from '../../components/Button'
import './MyClubDetail.css'


const MyClubDetail = () => {

    const location = useLocation()
    const club = location.state.club

    const handleClick = () => {

    }
    
    return(
        <div className="myClubDetail-container">
            <Button className="myClubDetail-card">
                <ClubCard club={ club } type="result" />
            </Button>
            <div className="myClubDetail-button">
                <Button variant="primary-cta" onClick={handleClick}>{"Cierra la porra"}</Button>
            </div>
        </div>
    )
}

export default MyClubDetail