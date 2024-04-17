import { useEffect, useState } from "react";
import { client } from "/src/api/config/client.js";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

export const LotteryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lotteries, setLottery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/lotteries");
        setIsLoading(false);
        setLottery(data.results);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchLottery();
  }, []);

  const handleMakeLotteryBet = (id) => {
    navigate(`/make-lottery-bet/${id}`);
  };

  return (
    <main className="lottery-container center-items">
      <h1>Escoge tu rifa</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <section className="lotteries center-items">
          {lotteries?.map((bet) => (
            <button
              key={bet.id}
              className="lottery-card center-items"
              onClick={() => handleMakeLotteryBet(bet.id)}
            >
              <div className="circle-logo center-items">R</div>
              <img src={bet.client.logo} className="lottery-client" />
              <div className="lottery-description">{bet.lotteryPrize}</div>
              <div className="generateQR-container">
                <QRCode
                  value={`https://miporra.es/make-lottery-bet/${bet.id}`}
                  size="200"
                />
              </div>
            </button>
          ))}
        </section>
      )}
    </main>
  );
};

export default LotteryPage;
