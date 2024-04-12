import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import { useClubContext } from "../../../context/ClubContext";
import { client } from "../../../api/config/client";
import { useNavigate } from "react-router-dom";
import { useBadgesContext } from "../../../context/BadgesContext";

export const MakeBet = () => {
  const { currentClub } = useClubContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { getBadge, isLoadingBadges } = useBadgesContext();

  const handleMakeBet = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const betData = Object.fromEntries(formData);
    betData.betDate = new Date().toLocaleDateString();
    betData.betPrice = String(currentClub.betPrice);
    betData.clubId = currentClub.id;

    console.log(betData);
    try {
      setIsLoading(true);
      const { data } = await client.post("/newClubBet", { ...betData });
      console.log("La apuesta ha sido subida", data);
      setIsLoading(false);
      navigate("/clubs");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentClub) navigate("/clubs");
  }, []);

  return (
    <main className="bet-container">
      <h1>APOSTAR</h1>
      <div className="bet-card">
        <p className="client-logo">{currentClub?.client.name}</p>
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
      </div>
    </main>
  );
};

export default MakeBet;
