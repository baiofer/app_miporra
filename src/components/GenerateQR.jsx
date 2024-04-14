import Button from "./Button"
import QRCode from 'qrcode.react'
import { useNavigate, useLocation } from 'react-router-dom'
import './GenerateQR.css'

// eslint-disable-next-line react/prop-types
const GenerateQR = () => {

    const location = useLocation()
    const url = location.state.url
    const type = location.state.type

    console.log(url)

    const navigate = useNavigate()

    const handleContinue = () => {
        if (type === 'club') {
            navigate('/myClubsList')
        } else {
            navigate('/myLotteriesList')
        }
    }

    const texto = `Imprima este código QR antes de "Continuar", para acceder directamente a la pantalla de hacer una apuesta para una ${type === 'club' ? 'porra' : 'rifa'}.`

    return(
        <div className="generateQR-container">
            <QRCode value={ url } size='200'/>
            <p className="generateQR-text">{ texto }</p>
            <div className="generateQR-button"> 
                <Button variant='primary-cta' onClick={handleContinue}>Continuar</Button>
            </div>
        </div>
    )

}

export default GenerateQR