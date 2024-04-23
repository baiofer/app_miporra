import { useEffect, useState } from "react";
import { client } from "../../../api/config/client";
import { useNavigate } from "react-router-dom";
import encuentraBar from '../../../images/Encuentra.svg'
import adelante from '../../../images/adelante.svg'

export const ClientsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clients");
        setIsLoading(false);
        setClubs(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleClientDetail = (id) => {
    navigate(`/client-detail/${id}`);
  };

  return (
    <div>
      <img src={encuentraBar} alt='header' />
      <button className='back-image-button' onClick={ () => navigate('/porras')}>
        <img className="clubs-image" src={adelante} alt="Atras" />
      </button>
      <main className="clientsPage-container clientsPage-center-items">
        {isLoading ? (
          <p className="clientsPage-loading">Cargando...</p>
        ) : (
          <section className="clients-section center-items">
            {clubs.map((client) => (
              <button
                className="client-card center-items"
                key={client.id}
                onClick={() => handleClientDetail(client.id)}
              >
                <img
                  className="client-logo"
                  src={client.logo}
                  alt="client-logo"
                  onError={(e) => {
                    e.target.onerror = null; // para evitar bucles infinitos
                    e.target.src = "placeholder-img.png";
                  }}
                />
                <div className="client-name">{client.name}</div>
              </button>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ClientsPage;
