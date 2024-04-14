import QRCode from 'qrcode.react'

const CreateQRCode = (url) => {

    return (
        <div>
            <QRCode value={ url.url } size='200'/>
        </div>
    )
}

export default CreateQRCode