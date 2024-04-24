import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClubContext } from "../../../context/ClubContext";
import { getClubs, getLotteries } from "./service";
import { Button } from "@mui/material";
import ClubCard from "../../../components/ClubCard";
import LotteryCard from "../../../components/LotteryCard";
import ErrorComponent from "../../../components/ErrorComponent";
import './ClientsDetail.css'
import adelante from '../../../images/adelante.svg'
import apostar from '../../../images/Apostar.svg'


export const ClientDetail = () => {

	const { setCurrentClub } = useClubContext();

	const [isLoading, setIsLoading] = useState(false);
	const [clientClubs, setClientClubs] = useState([]);
	const [clientLotteries, setClientLotteries] = useState([]);
	const [error, setError] = useState(null)
  
	const navigate = useNavigate();

	const params = useParams();
	const clientId = params.id

	useEffect(() => {
		const fetchClientClubs = async () => {
			try {
				setIsLoading(true);
				const clubsList = await getClubs(clientId);
				const lotteriesList = await getLotteries(clientId);
				setIsLoading(false);
				setClientClubs(clubsList.results);
				setClientLotteries(lotteriesList.results);
			} catch (error) {
				setError(error)
				console.log('Error fetching: ', error);
			}
		};
		fetchClientClubs();
	}, []);

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

	const handleCreateClub = (club) => {
		setCurrentClub(club);
		navigate("/make-bet", { state: { club } });
	};

	const handleCreateLottery = (lottery) => {
		setCurrentClub(lottery);
		navigate("/make-lottery-bet", { state: { lottery } });
	};
	
	return (
		<div className="clientDetail-container">
			<img src={apostar} alt='header' className="clientsPage-imageBar"/>
			<button className='back-image-button' onClick={ () => navigate(`/clients`)}>
				<img className="clubs-image" src={adelante} alt="Atras" />
			</button>
			<h1 className="clientDetail-title">Apuestas activas en este Bar</h1>
			{
				isLoading ? (
					<p>Cargando...</p>
				) : (
					<section className="clientDetail-active-bets clientDetail-center-items">
						<section className="clientDetail-clubs clientDetail-center-items">
							{
								clientClubs.length > 0 ?
									clientClubs.map( club => {
										return(
											<Button key={club.id} onClick={() => handleCreateClub(club)}>
												<ClubCard club={ club } />
											</Button>
										)
									})
								:
								<h3 className="clientDetail-message">No hay porras disponibles</h3>
							}
						</section>
						<section className="clientDetail-lotteries clientDetail-center-items">
							{
								clientLotteries.length > 0 ?
									clientLotteries.map( lottery => {
										return(
											<Button key={lottery.id} onClick={() => handleCreateLottery(lottery)}>
												<LotteryCard lottery={ lottery } />
											</Button>
										)
									})
								:
									<h3 className="clientDetail-message">No hay rifas disponibles</h3>
							}
						</section>
					</section>
				)
			}
			{error && (
				<div>
					<ErrorComponent errorText={error} />
				</div>
			)}
		</div>
	);
};
