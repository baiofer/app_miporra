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
    <div>
      <h1>Bares</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {clubs.map((bet) => (
            <li key={bet.id}>
              <strong>BAR {bet.name}</strong> - Fecha: {bet.createdAt} @ BAR{" "}
              {bet.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientsPage;
