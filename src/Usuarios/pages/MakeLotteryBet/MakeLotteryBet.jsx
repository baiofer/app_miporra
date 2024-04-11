import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../api/config/client";

export const MakeLotteryBet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lottery, setLottery] = useState(null);
  const params = useParams();
  const lotteryArray = Array.from({ length: 100 }, (_, index) => index);

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get(`/lotteries?id=${params.id}`);
        setIsLoading(false);
        setLottery(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLottery();
  }, []);

  return (
    <main className="make-lottery-container">
      <h1>Apostar Rifas</h1>
      <div className="make-lottery-card">
        {lotteryArray.map((number) => (
          <button key={number}>{number}</button>
        ))}
      </div>
    </main>
  );
};
