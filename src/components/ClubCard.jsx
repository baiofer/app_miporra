/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import './ClubCard.css'

const Club = ({ club }) => {

    const clientLogged = useSelector (state => state.origin.clientLogged)
    const logo = clientLogged.logo

    const borderColor = club.state === 'in progress' ? 'green' : 'red'
    return (
        <div className='clubContainer' style={{ borderColor: borderColor}}>
            <div className='betZone'>
                <img src={ logo } alt='Logo del bar' className='imgContainer'/>
                <h2>{club.match1HomeTeam}  -  {club.match1AwayTeam}</h2>
                <h2>{club.match2HomeTeam}  -  {club.match2AwayTeam}</h2>
                <p>Estado de la porra: {club.state}</p>
            </div>
        </div>
    )
}

export default Club