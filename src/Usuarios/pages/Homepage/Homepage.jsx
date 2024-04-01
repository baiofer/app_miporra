import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import './homepage.css'

export const Homepage = () => {
  return (
    <div style={{ display: "block" }}>
      <h2> HOMEPAGE </h2>
      <div style={{ marginTop: '10px '}}>
        <Link to="/porras">
          <Button type="primary-cta" >Haz tu apuesta</Button>
        </Link>
      </div> 
      <div style={{ marginTop: '20px '}}>
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
