import { useEffect, useState } from "react";
import { client } from "../../client/client";

export const ClientsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clients");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, []);

  return <h1>Bares</h1>;
};

export default ClientsPage;
