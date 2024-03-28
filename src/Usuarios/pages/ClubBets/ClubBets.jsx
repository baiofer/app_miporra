import { useEffect, useState } from "react";
import { client } from "/src/api/config/client";

export const ClubBets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubBets, setClubBets] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clubBets");
        setIsLoading(false);
        setClubBets(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchClubs();
  }, []);

  return (
    <div>
      <h1>Apuestas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {clubBets.map((bet) => (
            <li key={bet.id}>
              <strong>{bet.userName}</strong> - Id: {bet.id} | Fecha :{" "}
              {bet.betDate} €{bet.betPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ClubBets;

// Esta es la página de APUESTAS: dónde sale un listado de las apuestas en una porra concreta?
// Todas las apuestas en activas en todas las porras?
