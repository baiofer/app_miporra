import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import './Homepage.css'
import apostar from '../../../images/Apostar.svg'
import image1 from '../../../images/imagen1.jpeg'
import image2 from '../../../images/imagen2.jpeg'
import encuentra from '../../../images/Encuentra.svg'

export const Homepage = () => {

  const navigate = useNavigate()
  return (
    <div className="homepage-container">
      <div className="homepage-title">
        <p className="homepage-text3>">
          NO TE PIERDAS LAS MEJORES APUESTAS EN TU BAR DE SIEMPRE
        </p>
      </div>
      <img className="homepage-header" src={apostar} alt='Cabecera' />
      <img className="homepage-image1" src={image1} alt='Foto 1' />
      <img className="homepage-image2" src={image2} alt='Foto 2' />
      <button className="homepage-find" onClick={() => navigate('/clients')}>
        <img className="homepage-find-img" src={encuentra} alt='Encuentra tu bar' />
      </button>
      <div className="homepage-text1">
        <p>No te pierdas las apuestas y rifas activas muy cerca de ti.</p>
        <button className="homepage-button" onClick={() => navigate('/porras')}>
          <p>¡Entra y descubre!</p>
        </button>
      </div>
      <div className="homepage-text2">
        <button className="homepage-button" onClick={() => navigate('/porras')}>
          <p>Apuesta por tus equipos favoritos.</p>
        </button>
        <p>En tu bar de confianza. Miporra te da la seguridad y la facilidad de apostar por los que más te mueven.</p>
      </div>
    </div>
  );
};
