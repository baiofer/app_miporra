import { useEffect, useState } from "react";
import { client } from "../../client/client";

export const ClubBets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clubs");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClubs();
  }, []);

  return <h1>Club Bets</h1>;
};
