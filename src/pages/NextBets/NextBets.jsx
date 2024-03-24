import { useEffect, useState } from "react";
import { client } from "../../client/client";

export const NextBets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubBets = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clubBets");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClubBets();
  }, []);

  return <h1>Próximos Sorteos</h1>;
};

export default NextBets;
