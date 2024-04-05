import '.QRCodes.css'
import { useState } from 'react'
import Button from './Button'
import QRCode from 'qrcode.react'
import { Scanner } from '@yudiel/react-qr-scanner'

export const CreateQRCode = (url, width, height) => {

    const [drawQR, setDrawQR] = useState(false)

    const handleOnClick = () => {
        setDrawQR(true)
    }

    return (
        <div style={{ width: width, height: height}}>
            <Button variant="primary-cta" onClick={handleOnClick}>Genera QR</Button>
            {
                drawQR ? <QRCode value={ url } /> : null
            }
        </div>
    )
}

export const ReadQRCode = () => {

    const handleResult = (text, result) => {
        console.log('Text: ', text)
        console.log('Result: ', result)
    }

    const handleError = (error) => {
        console.log(error.message)
    }

    return (
        <div>
            <Scanner
                style={{ width: '100px', height: '100px' }}
                onResult={(text, result) => handleResult(text, result)}
                onError={error => handleError(error)}
            />
        </div>
    )

}
