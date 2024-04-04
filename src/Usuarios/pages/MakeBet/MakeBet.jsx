import { useState } from "react";
import Button from "../../../components/Button";
import FormInput from "../../../components/FormInput";
import { useClubContext } from "../../../context/ClubContext";
import { client } from "../../../api/config/client";
import { useNavigate } from "react-router-dom";

export const MakeBet = () => {
  const { currentClub } = useClubContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(currentClub);

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

  return (
    <>
      <h1>APOSTAR</h1>
      <div className="bet-card">
        <p>{currentClub.client.name}</p>
        <form method="POST" className="bet-teams" onSubmit={handleMakeBet}>
          <div className="bet-user-data">
            <FormInput type="text" name="userName" label="Tu nombre" />
            <FormInput type="email" name="userEmail" label="Tu mail" />
          </div>
          <div className="team-row">
            <div className="bet-box">
              <div>{currentClub.match1HomeTeam}</div>
              <FormInput
                type="number"
                name="match1HomeTeamResult"
                step={1}
                min={0}
                defaultValue={0}
              />
            </div>
            /{" "}
            <div className="bet-box">
              <div>{currentClub.match1AwayTeam}</div>
              <FormInput
                type="number"
                name="match1AwayTeamResult"
                step={1}
                min={0}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="team-row">
            <div className="bet-box">
              <div>{currentClub.match2HomeTeam}</div>
              <FormInput
                type="number"
                name="match2HomeTeamResult"
                step={1}
                min={0}
                defaultValue={0}
              />
            </div>
            /{" "}
            <div className="bet-box">
              <div>{currentClub.match2AwayTeam}</div>
              <FormInput
                type="number"
                name="match2AwayTeamResult"
                step={1}
                min={0}
                defaultValue={0}
              />
            </div>
          </div>
          <Button type="submit">Apostar</Button>
        </form>
      </div>
    </>
  );
};

export default MakeBet;
