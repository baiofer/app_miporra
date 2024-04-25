import { useEffect, useState } from "react";
import { client } from "/src/api/config/client.js";
import { useNavigate } from "react-router-dom";
import apostar from '../../../images/Apostar.svg'
import adelante from '../../../images/adelante.svg'
import './Lottery.css'
import ErrorComponent from "../../../components/ErrorComponent";
import { Button } from "@mui/material";
import LotteryCard from "../../../components/LotteryCard";
import { getLotteries } from "./service";


export const LotteryPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [lotteries, setLottery] = useState([]);
	const [error, setError] = useState(null)

	const navigate = useNavigate();

	useEffect(() => {
		const fetchLottery = async () => {
			try {
				setIsLoading(true);
				const lotteriesList = await getLotteries();
				const sortedLotteries = lotteriesList.data.results.sort((a, b) => new Date(b.dateLimitOfBets) - new Date(a.dateLimitOfBets))
				setIsLoading(false);
				setLottery(sortedLotteries);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		fetchLottery();
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

	const handleMakeLotteryBet = (lottery) => {
		navigate(`/make-lottery-bet/${lottery.id}`);
	};

	return (
		<div className="lottery-first-container">
			<img src={apostar} alt='header' className="clubs-imageBets"/>
			<button className='back-image-button' onClick={ () => navigate('/porras')}>
				<img className="clubs-image" src={adelante} alt="Atras" />
			</button>
			{
				lotteries.length === 0 ?
					<h2 className='clubs-title'>No hay rifas disponibles</h2>
				:
					<h2 className='clubs-title'>Escoge tu rifa</h2>
			}
			{
				isLoading ? 
					<p>Cargando rifas ...</p>
				: null
			}
			<div className='lottery-body-container'>
                {
                    lotteries ?
                        lotteries.map( lottery => {
                            return(
                                <Button key={lottery.id} onClick={() => handleMakeLotteryBet(lottery)}>
                                    <LotteryCard lottery={ lottery } />
                                </Button>
                            )
                        })
                        :
                        <p>No hay ninguna rifa creada</p>
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

export default LotteryPage;
