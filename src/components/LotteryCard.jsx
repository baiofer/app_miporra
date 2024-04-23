/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import './LotteryCard.css'
import { useState } from 'react'

{/* 
    type puede tener tres estados
    type="" o sin type: card sin entrada de resultado
    type="results": Card con input para introducir resultados
*/}

const LotteryCard = ({ lottery, type="", onChange }) => {

    const clientLogged = useSelector (state => state.origin.clientLogged)
    const logo = clientLogged.logo

    const [result, setResult] = useState(0)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por lo que añadimos 1
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleChange = (res) => {
        setResult(res)
        onChange(res)   
    }

    const borderColor = lottery.state === 'in progress' ? 'green' : 'red'
    return (
        <div className='lottery-container' style={{ borderColor: borderColor}}>
            <div className='lottery-betZone'>
                <div className='lottery-header'>
                    <div className='lottery-header-date'>
                        <p className='lottery-end-line-label'>Límite apuestas: </p>
                        <p className='lottery-end-line-value'>{formatDate(lottery.dateLimitOfBets)}</p>
                    </div>
                    <img src={ logo } alt='Logo del bar' className='lottery-imgContainer'/>    
                </div>
                <div className='lottery-divisor' />
                <input className='lottery-input-result' 
                    type="number"
                    name="result"
                    value={result}
                    onChange={e => handleChange(e.target.value)}
                    min="0"
                    label="Resultado"
                    style={{ display: type === "result" && lottery.state === "in progress" ? "visible" : "none"}}
                />
                {
                    lottery.result !== -1 ?
                        <p className='lottery-finished'>{lottery.result}</p>
                    : null
                }
                <div className='lottery-price-line'>
                    <p className='lottery-end-line-label'>Premio:</p>
                    <p className='lottery-end-line-value'>{lottery.lotteryPrize}</p>
                </div>
                <div className='lottery-howToWin-line'>
                    <p className='lottery-end-line-label'>Ganador:</p>
                    <p className='lottery-end-line-value'>{lottery.howToWin}</p>
                </div>
                
                <div className='lottery-end-line'>
                    <p className='lottery-end-line-label'>Estado: </p>
                    <p className='lottery-end-line-value'>{lottery.state === "in progress" ? "Activa" : "Cerrada"}</p>
                    <p className='lottery-end-line-label'>Apuesta: </p> 
                    <p className='lottery-end-line-value'>{lottery.betPrice}€</p>
                    {
                        lottery.jackpot ? 
                            <div>
                                <p className='lottery-end-line-label'>Bote: </p>
                                <p className='lottery-end-line-value'>{lottery.jackpot}€</p>
                            </div> 
                        : null
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default LotteryCard