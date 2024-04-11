import './Client.css'
import add from '../../images/addElement.svg'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Client = () => {

    const clientLogged = useSelector((state) => state.origin.clientLogged);
    const clientLogo = clientLogged.logo

    const navigate = useNavigate()

    const handleClubClick = () => {
        navigate('/createClub')
    }

    const handleLotteryClick = () => {
        navigate('/createLottery')
    }

    const handleCloseClub = () => {
        navigate('/closeClub')
    }

    const handleCloseLottery = () => {
        navigate('/closeLottery')
    }

    const handleClubList = () => {
        navigate('/myClubsList')
    }

    const handleLotteryList = () => {
        navigate('/myLotteriesList')
    }
    
    return(
        <div className="client-container">
            <img className='client-logo' src={clientLogo} alt="Logo del cliente" />
            <div className='client-total-container'>
                <div className='client-club-container'>
                    <div className='client-club-container-back'>
                        <div className='client-club'>
                            <p className='container-title'>CREAR</p>
                            <p className='container-title'>APUESTA</p>
                        </div>
                        <img className='client-add' src={add} alt='Añadir porra' onClick={handleClubClick}/>                        
                        <div className='client-club' onClick={handleCloseClub}>
                            <p className='container-title'>CERRAR</p>
                            <p className='container-title'>APUESTA</p>
                        </div>
                    </div>
                    <div className='client-button'>
                        <Button variant="primary-cta" onClick={handleClubList}>
                            Historial porras
                        </Button>
                    </div>
                </div>
                <div className='client-lottery-container'>
                    <div className='client-lottery-container-back'>
                        <div className='client-lottery'>
                            <p className='container-title'>CREAR</p>
                            <p className='container-title'>RIFA</p>
                        </div>
                        <img className='client-add' src={add} alt='Añadir rifa' onClick={handleLotteryClick}/>
                        <div className='client-lottery' onClick={handleCloseLottery}>
                            <p className='container-title'>CERRAR</p>
                            <p className='container-title'>RIFA</p>
                        </div>
                    </div>
                    <div className='client-button' >
                        <Button  variant="secondary-cta" onClick={handleLotteryList}>
                            Historial rifas
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Client