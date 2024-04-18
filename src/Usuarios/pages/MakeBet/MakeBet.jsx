import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import { useClubContext } from "../../../context/ClubContext";
import { client } from "../../../api/config/client";
import { Link, useNavigate } from "react-router-dom";
import { useBadgesContext } from "../../../context/BadgesContext";
import { v4 as uuidV4 } from "uuid";
import { generateRandomCode } from "../../../utils/generateRnmNumber";

export const MakeBet = () => {
  const { currentClub } = useClubContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { getBadge, isLoadingBadges } = useBadgesContext();
  const [createdBetId, setCreatedBetId] = useState(null);

  const handleMakeBet = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const betData = Object.fromEntries(formData);
    betData.betDate = new Date().toLocaleDateString();
    betData.betPrice = String(currentClub.betPrice);
    betData.clubId = currentClub.id;
    const betId = generateRandomCode();
    console.log(betData);

    const finalData = {
      number: betId,
      clientId: currentClub.clientId,
      type: "club",
      bet: { ...betData },
    };

    try {
      setIsLoading(true);
      const { data } = await client.post("/newValidation", finalData);
      await client.post("/newClubBet", { ...betData });
      console.log("La apuesta ha sido subida", data);
      setCreatedBetId(betId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  console.log(currentClub);

  useEffect(() => {
    if (!currentClub) navigate("/clubs");
  }, []);
  console.log({ createdBetId });
  return (
    <main className="bet-container">
      <h1>APOSTAR</h1>
      <div className="bet-card">
        <p className="client-logo">{currentClub?.client.name}</p>
        {!createdBetId ? (
          <form method="POST" className="bet-teams" onSubmit={handleMakeBet}>
            <div className="bet-user-data">
              <FormInput
                disabled={isLoading}
                type="text"
                name="userName"
                label="Tu nombre"
              />
              <FormInput
                disabled={isLoading}
                type="email"
                name="userEmail"
                label="Tu mail"
              />
            </div>
            <div className="teams-row">
              <div className="bet-box">
                <img src={getBadge(currentClub?.match1HomeTeam)} />
                <FormInput
                  disabled={isLoading}
                  type="number"
                  name="match1HomeTeamResult"
                  step={1}
                  min={0}
                  defaultValue={0}
                />
              </div>
              /{" "}
              <div className="bet-box">
                <img src={getBadge(currentClub?.match1AwayTeam)} />
                <FormInput
                  disabled={isLoading}
                  type="number"
                  name="match1AwayTeamResult"
                  step={1}
                  min={0}
                  defaultValue={0}
                />
              </div>
            </div>
            <div className="teams-row">
              <div className="bet-box">
                <img src={getBadge(currentClub?.match2HomeTeam)} />
                <FormInput
                  disabled={isLoading}
                  type="number"
                  name="match2HomeTeamResult"
                  step={1}
                  min={0}
                  defaultValue={0}
                />
              </div>
              /{" "}
              <div className="bet-box">
                <img src={getBadge(currentClub?.match2AwayTeam)} />
                <FormInput
                  disabled={isLoading}
                  type="number"
                  name="match2AwayTeamResult"
                  step={1}
                  min={0}
                  defaultValue={0}
                />
              </div>
            </div>
            <div className="submit-bet center-items">
              <Button type="submit" variant="primary-cta">
                {isLoading ? "Haciendo apuesta..." : "Apostar"}
              </Button>
            </div>
          </form>
        ) : (
          <div className={`${createdBetId} ? "lottery-bet" : ""`}>
            <h2>Este es tu código de identificación de la apuesta:</h2>
            <p>{createdBetId}</p>
            <Button
              onClick={() => navigate("/active-bets")}
              variant="primary-cta"
            >
              Ver apuestas activas
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default MakeBet;
