/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './ValidationsList.css'
import { createClubBet, createLotteryBet, deleteValidation, getValidations } from './service'
import validar from '../../images/validar.svg'
import deleteBet from '../../images/delete.svg'
import ErrorComponent from '../../components/ErrorComponent'
import Button from '../../components/Button'
import bares from '../../images/Bares.svg'
import adelante from '../../images/adelante.svg'
import { useNavigate } from 'react-router-dom'
import MessageComponent from '../../components/MessageComponent'


const ValidationsList = () => {

    const [validations, setValidations] = useState([])
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isChanged, setIsChanged] = useState(true)
    const [isFetching, setIsFetching] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (error || message) {
          const timer = setTimeout(() => {
            setError(null);
            setMessage(null)
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        }
      }, [error, message]);
    
    useEffect(() => {
        if (isChanged) {
            const fetchValidations = async () => {
                try {
                    setIsFetching(true)
                    const validationsList = await getValidations()
                    setValidations(validationsList.results)
                    setIsChanged(false)
                    setIsFetching(false)
                } catch (error) {
                    setError(error)
                    setIsChanged(false)
                    setIsFetching(false) 
                }
            }
            fetchValidations()
        }
    }, [isChanged])

    const handleValidate = async (bet) => {
        // Create club or Lottery bet
        try {
            if (bet.type === 'club') {
                // Create club bet
                await createClubBet(bet.bet)
            } else {
                // Create lottery bet
                await createLotteryBet(bet.bet)
            }
            // Delete validation
            await deleteValidation(bet.id)
            setMessage(`Validada apuesta ${bet.number}`)
            setIsChanged(true)
        } catch (error) {
            setError(error)
        }
    }

    const handleDelete = async (bet) => {
        // Delete validation
        await deleteValidation(bet.id)
        setIsChanged(true)
    }

    

    return (
        <div className='validationsList-container'>
            <img src={bares} alt='header' className="activeBetList-header-bet"/>
            <button className='back-image-button' onClick={ () => navigate('/client')}>
                <img className="clubs-image" src={adelante} alt="Atras" />
            </button>
            {
                isFetching ?
                    <p className='validationsList-isFetching'>Cargando validaciones ...</p>
                : null
            }
            {
                validations.length > 0 ? 
                    <h2 className='validationsList-title'>Apuestas pendientes de validar</h2> 
                : 
                    <h2 className='validationsList-title'>No hay validaciones pendientes</h2>
            }
            {
                validations?.map((bet) => (
                    <div className='validationsList-validation' key={bet.id}>
                        <span className='validationsList-number'>{bet.number}</span>
                        <span className='validationsList-name'>{bet.bet.userName}</span>
                        <div className='validationsList-icons-container'>
                            <img className='validationsList-icon' src={validar} alt='Validar apuesta' onClick={() => handleValidate(bet)}/>
                            <img className='validationsList-icon' src={deleteBet} alt='Borrar apuesta' onClick={() => handleDelete(bet)}/>
                        </div>
                    </div>
                ))
            }
            <div className='validationsList-refresh'>
                <Button  variant='primary-cta' onClick={ () => setIsChanged(true) }>Refrescar validaciones</Button>
            </div>
            {
                error && (
                    <div style={{ marginTop: '20px' }}>
                        <ErrorComponent errorText={error} />
                    </div>
                )
            }
            {
                message && (
                    <div style={{ marginTop: '20px' }}>
                        <MessageComponent messageText={message} />
                    </div>
                )
            }
        </div>
    )
}

export default ValidationsList