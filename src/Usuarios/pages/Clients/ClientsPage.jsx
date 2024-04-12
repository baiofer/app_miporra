import { useEffect, useState } from "react";
import { client } from "../../../api/config/client";

export const ClientsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

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

  return (
    <main className="clients-container center-items">
      <h1>Bares</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <section className="clients-section center-items">
          {clubs.map((client) => (
            <div className="client-card center-items" key={client.id}>
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
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default ClientsPage;
