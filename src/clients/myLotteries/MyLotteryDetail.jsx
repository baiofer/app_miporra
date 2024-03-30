import { Scanner } from '@yudiel/react-qr-scanner'


const MyLotteryDetail = () => {


    const handleResult = (text, result) => {
        console.log('Text: ', text)
        console.log('Result: ', result)
    }

    const handleError = (error) => {
        console.log(error.message)
    }

    return (
        <div>
            <p>Página Detalle de una rifa</p>
            <h2>Página para escanear un código QR</h2>
            <Scanner
                onResult={(text, result) => handleResult(text, result)}
                onError={error => handleError(error)}
            />
        </div>
    )
}

export default MyLotteryDetail