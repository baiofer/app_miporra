import { useClubContext } from "../../../context/ClubContext";

export const MakeBet = () => {
  const { currentClub } = useClubContext();
  console.log(currentClub);
  return (
    <>
      <h1>APOSTAR</h1>
      <div className="bet-card">
        <p>{currentClub.client.name}</p>
        <div className="bet-teams">
          <div className="team-row">
            <div className="bet-box">
              <div>{currentClub.match1HomeTeam}</div>
              <input type="text" />
            </div>
            /{" "}
            <div className="bet-box">
              <div>{currentClub.match1AwayTeam}</div>
              <input type="text" />
            </div>
          </div>
          <div className="team-row">
            <div className="bet-box">
              <div>{currentClub.match2HomeTeam}</div>
              <input type="text" />
            </div>
            /{" "}
            <div className="bet-box">
              <div>{currentClub.match2AwayTeam}</div>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeBet;
