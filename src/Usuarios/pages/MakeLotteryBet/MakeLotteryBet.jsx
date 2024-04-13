import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../api/config/client";

export const MakeLotteryBet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lottery, setLottery] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const params = useParams();
  const lotteryArray = Array.from({ length: 100 }, (_, index) => index);

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get(
          `/lotteryBets?LotteryId=${params.id}`
        );
        setIsLoading(false);
        setLottery(data.results);
        const numbers = data.results.map((number) => +number.selectedNumber);
        console.log(numbers);
        setSelectedNumbers(numbers);
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
          <button key={number} disabled={selectedNumbers.includes(+number)}>
            {number}
          </button>
        ))}
      </div>
    </main>
  );
};
