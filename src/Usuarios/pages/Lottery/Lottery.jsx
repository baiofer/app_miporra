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
    <main className="lottery-container center-items">
      <h1>Escoge tu rifa</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <section className="lotteries center-items">
          {lotteries?.map((bet) => (
            <div key={bet.id} className="lottery-card center-items">
              <div className="circle-logo center-items">R</div>
              <img src={bet.client.logo} className="lottery-client" />
              <div className="lottery-description">{bet.lotteryPrize}</div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default LotteryPage;

// Página de rifas, resultado de todas las rifas activas
// TODO: Fichas de rifas con info de la fecha, el bar que pertenece, fecha sorteo, etc
// TODO: Página detalle rifa? Hacer apuesta en rifa?
