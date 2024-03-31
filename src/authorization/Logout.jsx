import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setOrigin } from "../redux/reducers/originReducer"
import { useEffect } from "react"

const Logout = () => {

    const dispatch = useDispatch()
    dispatch(setOrigin('user'))
    useEffect(() => {
        dispatch(setOrigin('user'));
      }, [dispatch]);

    return (
        <div>
            <Link to="/porras"></Link>
        </div>
    )
}

export default Logout