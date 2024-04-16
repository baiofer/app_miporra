import { useLocation } from "react-router-dom"
import Button from '../../components/Button'
import './MyLotteryDetail.css'
import LotteryCard from "../../components/LotteryCard"


const MyLotteryDetail = () => {

    const location = useLocation()
    const lottery = location.state.lottery

    console.log(lottery)

    const handleClick = () => {

    }
    
    return(
        <div className="myClubDetail-container">
            <Button className="myClubDetail-card">
                <LotteryCard lottery={ lottery } type="result" />
            </Button>
            <div className="myClubDetail-button">
                <Button variant="primary-cta" onClick={handleClick}>{"Cierra la porra"}</Button>
            </div>
        </div>
    )
}

export default MyLotteryDetail