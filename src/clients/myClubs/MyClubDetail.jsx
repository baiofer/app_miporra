import { useLocation } from "react-router-dom"
import Club from "../../components/ClubCard"


const MyClubDetail = () => {

    const location = useLocation()
    const club = location.state.club

    console.log(club)
    
    return(
        <div>
            <Club club={ club } />
        </div>
    )
}

export default MyClubDetail