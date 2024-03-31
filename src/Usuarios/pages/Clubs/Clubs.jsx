import { useEffect, useState } from "react";
import { client } from "/src/api/config/client";
import { Link } from "react-router-dom";

export const Clubs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Clubs, setClubBets] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clubs");
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
        <ul style={{ listStyle: "none" }}>
          {Clubs.map((bet) => (
            <>
              <li key={bet.id} style={{ marginTop: "1rem" }}>
                <strong>{bet.client.name}</strong>
              </li>

              <li>
                <Link
                  to={`/make-bet/${bet.clubs.id}`}
                  style={{
                    display: "flex",
                    gap: "2rem",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    {/* {new Date(bet.club.match1Date).toLocaleDateString()}{" "} */}
                    {bet.club.match1Date} {bet.club.match1Hour}
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>{bet.club.match1HomeTeam}</div>
                    <div>{bet.club.match1AwayTeam}</div>
                    <div>{bet.match1HomeTeamResult}</div>
                    <div>-</div>
                    <div>{bet.match1AwayTeamResult}</div>
                  </div>
                  <div>
                    {/* {new Date(bet.club.match1Date).toLocaleDateString()}{" "} */}
                    {bet.club.match2Date} {bet.club.match2hour}
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>{bet.club.match2HomeTeam}</div>
                    <div>{bet.club.match2AwayTeam}</div>
                    <div>{bet.match2HomeTeamResult}</div>
                    <div>-</div>
                    <div>{bet.match2AwayTeamResult}</div>
                  </div>
                </Link>
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ClubBets;

// Esta es la página de APUESTAS: dónde sale un listado de las apuestas en una porra concreta?
// Todas las apuestas en activas en todas las porras?
