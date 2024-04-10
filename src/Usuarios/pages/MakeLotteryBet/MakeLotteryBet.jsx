import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../api/config/client";

export const MakeLotteryBet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lottery, setLottery] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get(`/lotteries?id=${params.id}`);
        setIsLoading(false);
        setLottery(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLottery();
  }, []);

  return (
    <>
      <h1>Apostar Rifas</h1>
      <p>{params.id}</p>
    </>
  );
};
