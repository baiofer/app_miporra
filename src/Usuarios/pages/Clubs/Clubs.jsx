import { useEffect, useState } from "react";
import { client } from "/src/api/config/client";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useClubContext } from "../../../context/ClubContext";
import { useBadgesContext } from "../../../context/BadgesContext";

export const Clubs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const { setCurrentClub } = useClubContext();
  const navigate = useNavigate();
  const { getBadge, currentBadges, isLoadingBadges } = useBadgesContext();

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

  const handleCreateClub = (club) => {
    setCurrentClub(club);
    navigate("/make-bet");
  };

  return (
    <div>
      <h1>Porras activas</h1>
      {isLoading || isLoadingBadges ? (
        <p>Cargando...</p>
      ) : (
        <div className="clubs center-items">
          {clubs.map((club) => (
            <button
              className="club-card"
              onClick={() => handleCreateClub(club)}
              key={club.id}
            >
              <div className="club-logo center-items">
                <span>A</span>
                <span>{club.client.name}</span>
              </div>
              <div className="club-teams center-items">
                <div className="club-match">
                  <img src={getBadge(club.match1HomeTeam)} />/{" "}
                  <img src={getBadge(club.match1AwayTeam)} />
                </div>
                <div className="club-match">
                  <img src={getBadge(club.match2HomeTeam)} />/{" "}
                  <img src={getBadge(club.match2AwayTeam)} />
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
