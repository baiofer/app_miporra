import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../api/config/client";

export const ClientDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientClubs, setClientClubs] = useState(null);
  const [clientLotteries, setClientLotteries] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchClientClubs = async () => {
      try {
        setIsLoading(true);
        const { data: clubs } = await client.get(
          `/clubs?clientId=${params.id}`
        );
        const { data: lotteries } = await client.get(
          `/lotteries?clientId=${params.id}`
        );
        setIsLoading(false);
        console.log(clubs);
        console.log(lotteries);
        setClientClubs(clubs.results);
        setClientLotteries(lotteries.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientClubs();
  }, []);
};
