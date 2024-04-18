import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

const PorrasPage = () => {
  return (
    <div className="porras-page-container">
      <div className="porras-page-box">
        <Link to="/lottery-bets">
          <Button variant="primary-cta">Participa en una rifa (QR)</Button>
        </Link>
      </div>
      <div className="porras-page-box">
        <Link to="/clubs">
          <Button variant="primary-cta">Apuesta ahora en tu bar (QR)</Button>
        </Link>
      </div>
      <div className="porras-page-box">
        <Link to="/homepage">
          <Button variant="primary-cta">¿Qué es miporra?</Button>
        </Link>
      </div>
      <div className="porras-page-box">
        <Link to="/clients">
          <Button variant="primary-cta">Encuentra tu bar</Button>
        </Link>
      </div>
    </div>
  );
};

export default PorrasPage;
