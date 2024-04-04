import { useEffect, useState } from "react";
import { client } from "/src/api/config/client";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const Clubs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clubs");
        setIsLoading(false);
        setClubs(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchClubs();
  }, []);

  console.log(clubs);
  return (
    <div>
      <h1>Porras activas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="clubs center-items">
          {clubs.map((club) => (
            <button className="club-card">
              <div className="club-logo center-items">
                <span>A</span>
                <span>{club.client.name}</span>
              </div>
              <div className="club-teams center-items">
                <div className="club-match">
                  {club.match1HomeTeam} / {club.match1AwayTeam}
                </div>
                <div className="club-match">
                  {club.match2AwayTeam} / {club.match2HomeTeam}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default Clubs;

// Esta es la página de APUESTAS: dónde sale un listado de las apuestas en una porra concreta?
// Todas las apuestas en activas en todas las porras?
