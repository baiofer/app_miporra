import { useEffect, useState } from "react";
import { client } from "../../client/client";

export const LotteryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lotteries, setLottery] = useState([]);

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/lotteries");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLottery();
  }, []);

  return <h1>Rifas</h1>;
};

export default LotteryPage;
