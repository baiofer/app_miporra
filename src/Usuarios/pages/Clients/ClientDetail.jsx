import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

  return (
    <div>
      <h1>Apuestas activas en este Bar</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {clientClubs?.map((bet) => (
            <>
              <li key={bet.id} style={{ marginTop: "1rem" }}>
                <strong>{bet.client.name}</strong>
              </li>

              <li>
                <Link
                  to={`/make-bet/${bet?.clubs?.id}`}
                  style={{
                    display: "flex",
                    gap: "2rem",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    {/* {new Date(bet.club.match1Date).toLocaleDateString()}{" "} */}
                    {bet?.club?.match1Date} {bet?.club?.match1Hour}
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>{bet?.club?.match1HomeTeam}</div>
                    <div>{bet?.club?.match1AwayTeam}</div>
                    <div>{bet?.match1HomeTeamResult}</div>
                    <div>-</div>
                    <div>{bet?.match1AwayTeamResult}</div>
                  </div>
                  <div>
                    {/* {new Date(bet.club.match1Date).toLocaleDateString()}{" "} */}
                    {bet?.club?.match2Date} {bet?.club?.match2hour}
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>{bet?.club?.match2HomeTeam}</div>
                    <div>{bet?.club?.match2AwayTeam}</div>
                    <div>{bet?.match2HomeTeamResult}</div>
                    <div>-</div>
                    <div>{bet?.match2AwayTeamResult}</div>
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
