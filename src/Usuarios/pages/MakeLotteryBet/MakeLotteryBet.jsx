import { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";
import { generateRandomCode } from "../../../utils/generateRnmNumber";
import './MakeLotteryBet.css'
import { getBetsFromLottery, validateBet } from "./service";
import rifas from '../../../images/Rifas.svg'
import adelante from '../../../images/adelante.svg'
import { useNavigate, useLocation } from "react-router-dom";

export const MakeLotteryBet = () => {

	const [isLoading, setIsLoading] = useState(false);
	const [selectedNumbers, setSelectedNumbers] = useState([]);
	const [selectedNumber, setSelectedNumber] = useState(null);
	const [createdLotteryId, setCreatedLotteryId] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const location = useLocation()
	const currentLottery = location.state.lottery
	const navigate = useNavigate()

	const lotteryArray = Array.from({ length: 100 }, (_, index) => index);

	useEffect(() => {
		const fetchLottery = async () => {
			try {
				setIsLoading(true);
				const lotteryBetsList = await getBetsFromLottery(currentLottery.id)
				setIsLoading(false);
				const numbers = lotteryBetsList.results.map((number) => +number.selectedNumber);
				setSelectedNumbers(numbers);
			} catch (error) {
				setError(error)
				console.log(error);
			}
		};
		fetchLottery();
	}, []);

	const handleSelectNumber = (number) => {
	setSelectedNumber(number);
	setError(null);
	setCreatedLotteryId(null);
	};

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

	const handleSubmitLotteryBet = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const lotteryData = Object.fromEntries(formData);
		lotteryData.betDate = new Date().toLocaleDateString();
		lotteryData.selectedNumber = selectedNumber;
		lotteryData.betPrice = currentLottery.betPrice;
		lotteryData.lotteryId = currentLottery.id;
		const validationNumber = generateRandomCode();
		const finalData = {
			number: validationNumber,
			clientId: currentLottery.clientId,
			type: "lottery",
			bet: { ...lotteryData },
		};
		try {
			setIsSubmitting(true);

			const betValidated = await validateBet(finalData);

			if (betValidated.response) {
				return setError({message: 
					`El número ${selectedNumber} ya ha sido seleccionado. Por favor, recarga la página para actualizar los números cogidos`}
				);
			}
			//await client.post("/newLotteryBet", lotteryData);
			setCreatedLotteryId(validationNumber);
			setIsSubmitting(false);
		} catch (error) {
			console.log(error);
			setError(error)
			setIsSubmitting(false);
		}
	};

	return (
		<div className="makeLotteryBet-first-container">
			<img src={rifas} alt='header' className="make-bet-header-bet"/>
			<button className='back-image-button' onClick={ () => navigate('/lottery-bets')}>
				<img className="clubs-image" src={adelante} alt="Atras" />
			</button>
			<div className="makeLotteryBet-container">
				<h2 className="makeLotteryBet-title">Selecciona un número</h2>
				<div className="makeLotteryBet-card makeLotteryBet-center-items">
					{
						lotteryArray.map((number) => (
							<Button
								variant={`lottery-button ${
									number === selectedNumber
									? "lottery-number-selected"
									: "primary-cta"
								}`}
								key={number}
								disabled={selectedNumbers.includes(+number)}
								onClick={() => handleSelectNumber(number)}
							>
								{ number }
							</Button>
						))
					}
				</div>
				<div className="makeLotteryBet-bet">
					<img className="makeLotteryBet-logo" src={ currentLottery.client.logo} alt='Logo' />
					{
						selectedNumber && !createdLotteryId ? 
						
							<form
							method="POST"
							onSubmit={handleSubmitLotteryBet}
							>
								<div className="lottery-user-data">
									<FormInput
										disabled={isLoading}
										required
										type="text"
										name="userName"
										label="Tu nombre"
									/>
									<FormInput
										disabled={isLoading}
										required
										type="email"
										name="userEmail"
										label="Tu email"
									/>
									<p className="makeLotteryBet-text">Número seleccionado: </p>
									<p className="makeLotteryBet-number"> {selectedNumber}</p>
									<p className="makeLotteryBet-text1">Precio de la apuesta:  { currentLottery.betPrice }€</p>
								</div>
								{
									error && <p className="makeLotteryBet-error">{error.message}</p>
								}
								<div className="makeLotteryBet-submit-bet makeLotteryBet-center-items">
									<Button type="submit" variant="primary-cta">
										{isSubmitting ? "Haciendo apuesta..." : "Apostar"}
									</Button>
								</div>
							</form>
						:
							selectedNumber ?
								<div className={`${createdLotteryId} ? "lottery-bet" : ""`}>				
									<h3>Este es tu código de identificación de la apuesta:</h3>
									<p>Muestraselo al responsable del bar para que te valide la apuesta.</p>
										<h2>{createdLotteryId}</h2>
								</div>
							: null	
					}
				</div>
			</div>
		</div>
	);
};
