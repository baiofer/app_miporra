import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { client } from "../../../api/config/client";
import { useClubContext } from "../../../context/ClubContext";
import { useBadgesContext } from "../../../context/BadgesContext";
import QRCode from "qrcode.react";

export const ClientDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientClubs, setClientClubs] = useState(null);
  const [clientLotteries, setClientLotteries] = useState(null);
  const { setCurrentClub } = useClubContext();
  const { getBadge, isLoadingBadges } = useBadgesContext();
  const navigate = useNavigate();

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

  const handleCreateClub = (club) => {
    setCurrentClub(club);
    navigate("/make-bet");
  };

  const handleMakeLotteryBet = (id) => {
    navigate(`/make-lottery-bet/${id}`);
  };

  return (
    <div>
      <h1>Apuestas activas en este Bar</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <section className="client-active-bets center-items">
          <div className="clubs center-items">
            {clientClubs?.map((club) => (
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

          <section className="lotteries center-items">
            {clientLotteries?.map((bet) => (
              <button
                key={bet.id}
                className="lottery-card center-items"
                onClick={() => handleMakeLotteryBet(bet.id)}
              >
                <div className="circle-logo center-items">R</div>
                <img src={bet.client.logo} className="lottery-client" />
                <div className="lottery-description">{bet.lotteryPrize}</div>
                <div className="generateQR-container">
                  <QRCode
                    value={`https://miporra.es/make-lottery-bet/${bet.id}`}
                    size="200"
                  />
                </div>
              </button>
            ))}
          </section>
        </section>
      )}
    </div>
  );
};
