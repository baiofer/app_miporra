import { useEffect, useState } from "react";
import { client } from "../../../api/config/client";
import { useLocation } from "react-router-dom";

export const ActiveBets = () => {
  const [activeBets, setActiveBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation()
    const currentClub = location.state.currentClub

  useEffect(() => {
    const fetchActiveBets = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get(`/clubBets?clubId=${currentClub.id}`);
        setIsLoading(false);
        setActiveBets(data.results);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchActiveBets();
  }, []);

  return (
    <main className="active-bets-container center-items">
      <section className="active-bets">
        <h1 className="active-bets-title">Apuestas Activas</h1>
        {isLoading && <p>Cargando apuestas activas</p>}
        {activeBets?.map((bet) => (
          <div key={bet.id} className="active-bet-card center-items">
            <div>
              <p>{bet.userName}</p>
            </div>
            <div className="active-bet">
              <div className="active-bet-teams">
                <span>
                  {bet.club.match1HomeTeam} {bet.match1HomeTeamResult}
                </span>
                <span>
                  {bet.club.match1AwayTeam} {bet.match1AwayTeamResult}
                </span>
              </div>
              <div className="active-bet-teams">
                <span>
                  {bet.club.match2HomeTeam} {bet.match2HomeTeamResult}
                </span>
                <span>
                  {bet.club.match2AwayTeam} {bet.match2AwayTeamResult}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
