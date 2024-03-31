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

  return (
    <div>
      <h1>Porras activas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {clubs.map((club) => (
            <>
              <li key={club.id}>
                <Button
                  onclick={onclick}
                  style={{
                    display: "flex",
                    gap: "2rem",
                    flexDirection: "column",
                  }}
                >
                  <strong>{club.client.name}</strong>
                  <div>
                    {/* {new Date(bet.club.match1Date).toLocaleDateString()}{" "} */}
                    {club.match1Date} {club.match1Hour}
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>{club.match1HomeTeam}</div>
                    <div>{club.match1AwayTeam}</div>
                    <div>{club.match1HomeTeamResult}</div>
                    <div>-</div>
                    <div>{club.match1AwayTeamResult}</div>
                  </div>
                  <div>
                    {/* {new Date(bet.club.match1Date).toLocaleDateString()}{" "} */}
                    {club.match2Date} {club.match2hour}
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>{club.match2HomeTeam}</div>
                    <div>{club.match2AwayTeam}</div>
                    <div>{club.match2HomeTeamResult}</div>
                    <div>-</div>
                    <div>{club.match2AwayTeamResult}</div>
                  </div>
                </Button>
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Clubs;

// Esta es la página de APUESTAS: dónde sale un listado de las apuestas en una porra concreta?
// Todas las apuestas en activas en todas las porras?
