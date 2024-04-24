import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import { useNavigate, useLocation } from "react-router-dom";
import { generateRandomCode } from "../../../utils/generateRnmNumber";
import { validateBet } from "./service";
import ErrorComponent from "../../../components/ErrorComponent";
import adelante from '../../../images/adelante.svg'
import apuesta from '../../../images/apuesta.svg'
import apostar from '../../../images/Apostar.svg'
import './MakeBet.css'
import BadgeElement from "../../../components/BadgeElement";


export const MakeBet = () => {

	const location = useLocation()
	const currentClub = location.state.club

	const [isLoading, setIsLoading] = useState(false);
	const [createdBetId, setCreatedBetId] = useState(null);
	const [error, setError] = useState(null)

	const navigate = useNavigate();

	const handleMakeBet = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const betData = Object.fromEntries(formData);
		betData.betDate = new Date().toLocaleDateString();
		betData.betPrice = String(currentClub.betPrice);
		betData.clubId = currentClub.id;
		const betId = generateRandomCode();
		console.log(betData);

		const finalData = {
			number: betId,
			clientId: currentClub.clientId,
			type: "club",
			bet: { ...betData },
		};
		try {
			setIsLoading(true);
			const betValidated = await validateBet(finalData);
			//await client.post("/newClubBet", { ...betData });
			console.log("La apuesta ha sido subida", betValidated);
			setCreatedBetId(betId);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
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

	useEffect(() => {
		if (!currentClub) navigate("/clubs");
	}, []);

	const handleActiveBets = () => {
		navigate('/activeBetsList', { state: { club: currentClub } })
	}

	return (
		<div className="make-bet-first-container">
			<img src={apostar} alt='header' className="make-bet-header-bet"/>
			<button className='back-image-button' onClick={ () => navigate('/clubs')}>
				<img className="clubs-image" src={adelante} alt="Atras" />
			</button>
			<main className="makeBet-container">
			<h2 className="makeBet-title">Haz tu apuesta</h2>
			<div className="makeBet-card">
				<div className="makeBet-bet-header">
					<img className="makeBet-logo" src={currentClub?.client.logo} />
					<button className="makeBet-button" onClick={handleActiveBets}>
						<img className="makeBet-logo-apuesta" src={apuesta} />
					</button>
				</div>
				{
					!createdBetId ? (
						<form method="POST" onSubmit={handleMakeBet}>
							<div className="makeBet-user-data">
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
							</div>
							<div className="makeBet-teams-row">
								<div className="makeBet-bet-box">
									<div className="makeBet-badge">
										<BadgeElement name={currentClub?.match1HomeTeam} />
									</div>
									<FormInput
										disabled={isLoading}
										type="number"
										name="match1HomeTeamResult"
										step={1}
										min={0}
										defaultValue={0}
									/>
								</div>
								/{" "}
								<div className="bet-box">
									<div className="makeBet-badge">
										<BadgeElement name={currentClub?.match1AwayTeam} />
									</div>
									<FormInput
										disabled={isLoading}
										type="number"
										name="match1AwayTeamResult"
										step={1}
										min={0}
										defaultValue={0}
									/>
								</div>
							</div>
							<div className="teams-row">
								<div className="bet-box">
									<div className="makeBet-badge">
										<BadgeElement name={currentClub?.match2HomeTeam} />
									</div>
									<FormInput
										disabled={isLoading}
										type="number"
										name="match2HomeTeamResult"
										step={1}
										min={0}
										defaultValue={0}
									/>
								</div>
								/{" "}
								<div className="bet-box">
									<div className="makeBet-badge">
										<BadgeElement name={currentClub?.match2AwayTeam} />
									</div>
									<FormInput
										disabled={isLoading}
										type="number"
										name="match2AwayTeamResult"
										step={1}
										min={0}
										defaultValue={0}
									/>
								</div>
							</div>
							<div className="submit-bet center-items">
								<Button type="submit" variant="primary-cta">
									{isLoading ? "Haciendo apuesta..." : "Apostar"}
								</Button>
							</div>
						</form>
					) : (
						<div className={`${createdBetId} ? "lottery-bet" : ""`}>
							<h2>Este es tu código de identificación de la apuesta:</h2>
							<p>{createdBetId}</p>
							<Button
								onClick={() => navigate('/activeBetsList', { state: { club: currentClub } })}
								variant="primary-cta"
							>
								Ver apuestas activas
							</Button>
						</div>
					)
				}
			</div>
			{error && (
				<div>
					<ErrorComponent errorText={error} />
				</div>
			)}
			</main>
		</div>
	);
};

export default MakeBet;
