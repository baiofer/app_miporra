import { useEffect, useState } from "react";
import { client } from "../../api/config/client";

export const ClubBets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubBets, setClubBets] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clubBets");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClubs();
  }, []);

  return <h1>Apuestas</h1>;
};
export default ClubBets;

// Esta es la página de APUESTAS: dónde sale un listado de las apuestas en una porra concreta?
// Todas las apuestas en activas en todas las porras?
