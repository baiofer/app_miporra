import { useEffect, useState } from "react"
import FormInput from "../../components/FormInput"
import Button from "../../components/Button"
import ErrorComponent from "../../components/ErrorComponent"
import './CreateLottery.css'
import { useSelector } from 'react-redux'
import { createLottery } from "./service"
import { useNavigate } from 'react-router-dom'
import adelante from "../../images/adelante.svg"

const CreateLottery = () => {

    const [lotteryDate, setLotteryDate] = useState("")
    const [firstNumber, setFirstNumber] = useState(0)
    const [totalNumbers, setTotalNumbers] = useState(100)
    const [dateLimit, setDateLimit] = useState("")
    const [betPrice, setBetPrice] = useState(0)
    const [lotteryPrize, setLotteryPrize] = useState("")
    const [howToWin, setHowToWin] = useState("")
    const [error, setError] = useState(null)

    const clientLogged = useSelector((state) => state.origin.clientLogged);

    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError(null);
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        }
    }, [error]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(clientLogged)
        const lotteryToCreate = {
            firstNumber: firstNumber,
            totalNumbers: totalNumbers,
            dateOfLottery: lotteryDate,
            dateLimitOfBets: dateLimit,
            betPrice: betPrice,
            lotteryPrize: lotteryPrize,
            howToWin: howToWin,
            clientId: clientLogged.id, 
            state: 'in progress',
            numberOfWinners: 0,
            selectedNumber: -1,
            result:-1
        }
        try {
            const lotteryCreated = await createLottery(lotteryToCreate)
            const lotteryId = lotteryCreated.results.id
            const url = `https://miporra.es/make-lottery-bet/${lotteryId}`
            navigate('/generateQR', { state: { url, type:'lottery'}}) 
        } catch (error) {
            console.log('Error creating lottery: ', error)
            setError(error.message)
        }
    }


    return (
        <div>
            <button className='back-image-button' onClick={ () => navigate('/client')}>
                <img className="back-image" src={adelante} alt="Atras" />
            </button>
            <div className="createLottery-container">
                <p className='createLottery-title'>CREAR RIFA</p>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        className='createLottery-date'
                        type="date"
                        required
                        value={lotteryDate}
                        onChange={ e => setLotteryDate(e.target.value)}
                        label="Fecha del sorteo"
                        name="lotteryDate"
                    />
                    <FormInput 
                        className='createLottery-date'
                        type="number"
                        required
                        value={firstNumber}
                        onChange={ e => setFirstNumber(e.target.value)}
                        label="Primer número de la rifa"
                        name="firstNumber"
                    />
                    <FormInput 
                        className='createLottery-date'
                        type="number"
                        required
                        value={totalNumbers}
                        onChange={ e => setTotalNumbers(e.target.value)}
                        label="Cantidad de números"
                        name="totalNumbers"
                    />
                    <FormInput 
                        className='createLottery-date'
                        type="date"
                        required
                        value={dateLimit}
                        onChange={ e => setDateLimit(e.target.value)}
                        label="Fecha límite de apuestas"
                        name="dateLimit"
                    />
                    <FormInput 
                        className='createLottery-date'
                        type="number"
                        required
                        value={betPrice}
                        onChange={ e => setBetPrice(e.target.value)}
                        label="Precio apuesta"
                        name="betPrice"
                    />
                    <label className="createLottery-label">Premio</label>
                    <textarea 
                        className="createLottery-textArea"
                        rows="1"
                        cols="50"
                        value={lotteryPrize} 
                        onChange={e => setLotteryPrize(e.target.value)} 
                    />
                    <label className="createLottery-label">Como se gana</label>
                    <textarea 
                        className="createLottery-textArea"
                        rows="1"
                        cols="50"
                        value={howToWin} 
                        onChange={e => setHowToWin(e.target.value)} 
                    />
                    <div className="createLottery-access">
                        <Button variant="primary-cta">
                            {"Crea la rifa"}
                        </Button>
                    </div>
                </form>
                { error && 
                    <ErrorComponent errorText={error} />
                }
            </div>
        </div>
    )
}

export default CreateLottery