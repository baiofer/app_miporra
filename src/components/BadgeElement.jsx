import { useState } from "react";
import { useBadgesContext } from "../context/BadgesContext"
import './BadgeElement.css'

/* eslint-disable react/prop-types */
const BadgeElement = ({ name }) => {

    const { currentBadges } = useBadgesContext()

    const [imageFailed, setImageFailed] = useState(false);

    const badge = currentBadges.find( badge => badge.name === name)
    
    if (badge && badge.badge && !imageFailed) {
        return(
            <div className="badgeElement-container">
                <img src={badge.badge} alt="Escudo" className="badgeElement-badge"  onError={() => setImageFailed(true)}/>
                <p className="badgeElement-name">{ badge.name }</p>
            </div>
        )
    } else {
        return(
            <p className="badgeElement-name">{ badge.name }</p>
        )
    }
}

export default BadgeElement