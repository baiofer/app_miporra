import { useEffect, useState } from "react";
import { client } from "/src/api/config/client";

export const NextBets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nextBets, setNextBets] = useState([]);

  useEffect(() => {
    const fetchNextBets = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get("/clubBets");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNextBets();
  }, []);

  return <h1>Próximos Sorteos</h1>;
};

export default NextBets;

// esta página tiene un listado por orden de más nuevo de las apuestas y rifas activas?
// 2 lsitados o una que mexcel?
// TODO: 2 llamadas a la API y meter los datos de cada 1 en 2 [] dentro de un [] ...
// ...para que el map pinte los las lista contando con los 2 arays?
