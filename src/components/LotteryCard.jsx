/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import './LotteryCard.css'

const Lottery = ({ lottery }) => {

    const clientLogged = useSelector (state => state.origin.clientLogged)
    const logo = clientLogged.logo

    const borderColor = lottery.state === 'in progress' ? 'green' : 'red'
    return (
        <div className='clubContainer' style={{ borderColor: borderColor}}>
            <div className='betZone'>
                <img src={ logo } alt='Logo del bar' className='imgContainer'/>
                <h2>{lottery.lotteryPrize}</h2>
                <h2>{lottery.howToWin}</h2>
                <p>Estado de la porra: {lottery.state}</p>
            </div>
        </div>
    )
}

export default Lottery