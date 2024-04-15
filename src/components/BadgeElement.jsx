import { useBadgesContext } from "../context/BadgesContext"
import './BadgeElement.css'

/* eslint-disable react/prop-types */
const BadgeElement = ({ name }) => {

    const { currentBadges } = useBadgesContext()

    const badge = currentBadges.find( badge => badge.name === name)
    console.log(badge)
    
    return(
        <div className="badgeElement-container">
            <img src={badge.badge} alt="Escudo del equipo" className="badgeElement-badge" />
            <p className="badgeElement-name">{ badge.name }</p>
        </div>
    )
}

export default BadgeElement