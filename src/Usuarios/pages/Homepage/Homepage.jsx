import { Link } from "react-router-dom";
import Button from "../../../components/Button";

export const Homepage = () => {
  return (
    <div className="homepage-container">
      <h2> HOMEPAGE </h2>
      <div style={{ display: "inline" }}>
        <Link to="/porras">
          <Button style={{ margin: '10px' }} type="primary-cta">Haz tu apuesta</Button>
        </Link>
        
        <Link to="/register">
          <Button type="primary-cta">Unete a nuestra red de bares</Button>
        </Link>
      </div>
      {/*
      <div className="item homepage-bets"></div>
      <div className="item homepage-lottery"></div>
      <div className="item homepage-clients"></div>
      <div className="item homepage-info"></div>
    */}
    </div>
  );
};
