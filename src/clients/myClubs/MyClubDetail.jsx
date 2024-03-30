import QRCode from 'qrcode.react'
import { Button } from '@mui/material'
import { useState } from 'react'

const MyClubDetail = () => {

    const [drawQR, setDrawQR] = useState(false)

    const url = "https://api.miporra.es/v1.0/api-docs"

    const handleOnClick = () => {
        setDrawQR(true)
    }

    return (
        <div>
            <p>Página Detalle de una porra</p>

            <h2>Generación de código QR</h2>
            <Button type="primary-cta" onClick={handleOnClick}>Genera QR</Button>
            {
                drawQR ? <QRCode value={ url } /> : null
            }
        </div>
    )
}

export default MyClubDetail