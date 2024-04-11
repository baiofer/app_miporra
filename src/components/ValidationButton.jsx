import './ValidationButton.css'
import validar from '../images/validar.svg'

function ValidationButton() {
  return(
    <span className="validationButtonContainer">
        <div className='text-container'>
            <p className='text-container-p'>Validar</p>
            <img className="validarIcon" src={validar} alt="Validar porra o rifa" />
        </div>
    </span>
  )
}

export default ValidationButton;




