import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setOrigin } from "../redux/reducers/originReducer"
import { useEffect } from "react"

const Logout = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    dispatch(setOrigin('user'))
    useEffect(() => {
        dispatch(setOrigin('user'));
        navigate('/porras')
    }, [dispatch, navigate]);

    return (
        null
    )
}

export default Logout