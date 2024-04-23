import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useClubContext } from "../../../context/ClubContext";
import { getClubs } from "./service";
import apostar from '../../../images/Apostar.svg'
import './Clubs.css'
import adelante from '../../../images/adelante.svg'
import ClubCard from "../../../components/ClubCard";
import ErrorComponent from "../../../components/ErrorComponent";

export const Clubs = () => {

	const [isLoading, setIsLoading] = useState(false);
	const [clubs, setClubs] = useState([]);
	const [error, setError] = useState(null)

	const { setCurrentClub } = useClubContext();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchClubs = async () => {
			try {
				setIsLoading(true);
				const clubsList = await getClubs();
				const sortedClubs = clubsList.results.sort((a, b) => new Date(b.limitDateForBets) - new Date(a.limitDateForBets))
				setIsLoading(false);
				setClubs(sortedClubs);
				console.log(sortedClubs)
			} catch (error) {
				console.log(error);
				setError(error)
				setIsLoading(false);
			}
		};
		fetchClubs();
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

	if (isLoading) return (
		<div className="clubs-title">Buscando las apuestas disponibles ...</div>
	)

	return (
		<div>
			<img src={apostar} alt='header' />
			<button className='back-image-button' onClick={ () => navigate('/porras')}>
				<img className="clubs-image" src={adelante} alt="Atras" />
			</button>
			{
				clubs.length === 0 ?
					<h2 className='clubs-title'>No hay apuestas disponibles</h2>
				:
					<h2 className='clubs-title'>Escoge tu apuesta</h2>
			}
			<div className="clubs-presentation clubs-center-items">
				{
					clubs ?
					clubs.map( club => {
						return(
						<Button key={club.id} onClick={() => handleCreateClub(club)}>
							<ClubCard club={ club } />
						</Button>
						)
					})
					:
					<p>No hay apuestas disponibles</p>
				}
				{error && (
					<div>
						<ErrorComponent errorText={error} />
					</div>
				)}
			</div>
		</div>
	);
};
export default Clubs;

