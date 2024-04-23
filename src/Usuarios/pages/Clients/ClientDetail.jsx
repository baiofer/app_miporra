import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClubContext } from "../../../context/ClubContext";
import { getClubs, getLotteries } from "./service";
import { Button } from "@mui/material";
import ClubCard from "../../../components/ClubCard";
import LotteryCard from "../../../components/LotteryCard";
import ErrorComponent from "../../../components/ErrorComponent";



export const ClientDetail = () => {

	const { setCurrentClub } = useClubContext();

	const [isLoading, setIsLoading] = useState(false);
	const [clientClubs, setClientClubs] = useState(null);
	const [clientLotteries, setClientLotteries] = useState(null);
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
				console.log(error);
			}
		};
		fetchClientClubs();
	}, []);

	useEffect(() => {
		console.log('Error: ', error)
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
		<div>
			<h1 className="clientDetail-title">Apuestas activas en este Bar</h1>
			{
				isLoading ? (
					<p>Cargando...</p>
				) : (
					<section className="client-active-bets center-items">
						<div className="clubs center-items">
							{
								clientClubs ?
									clientClubs.map( club => {
									return(
										<Button key={club.id} onClick={() => handleCreateClub(club)}>
											<ClubCard club={ club } />
										</Button>
									)})
								:
									<p>No hay porras disponibles</p>
							}
						</div>
						<section className="lotteries center-items">
							{
								clientLotteries ?
									clientLotteries.map( lottery => {
									return(
										<Button key={lottery.id} onClick={() => handleCreateLottery(lottery)}>
											<LotteryCard lottery={ lottery } />
										</Button>
									)})
								:
									<p>No hay rifas disponibles</p>
							}
						</section>
						{error && (
							<div>
								<ErrorComponent errorText={error} />
							</div>
						)}
					</section>
				)
			}
		</div>
	);
};
