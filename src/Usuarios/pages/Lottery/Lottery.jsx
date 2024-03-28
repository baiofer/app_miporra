import { useEffect, useState } from "react";
import { client } from "/src/api/config/client.js";

export const LotteryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lotteries, setLottery] = useState([]);

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/lotteries");
        setIsLoading(false);
        setLottery(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchLottery();
  }, []);

  return (
    <div>
      <h1>Rifas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {lotteries.map((bet) => (
            <li key={bet.clientId}>
              <strong>Fecha límite: {bet.dateLimitOfBets}</strong> Premio:{" "}
              {bet.lotteryPrize}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LotteryPage;

// Página de rifas, resultado de todas las rifas activas
// TODO: Fichas de rifas con info de la fecha, el bar que pertenece, fecha sorteo, etc
// TODO: Página detalle rifa? Hacer apuesta en rifa?
