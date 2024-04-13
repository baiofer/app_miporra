import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../api/config/client";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";

export const MakeLotteryBet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lottery, setLottery] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const params = useParams();
  const lotteryArray = Array.from({ length: 100 }, (_, index) => index);

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        setIsLoading(true);
        const { data } = await client.get(
          `/lotteryBets?LotteryId=${params.id}`
        );
        setIsLoading(false);
        setLottery(data.results);
        const numbers = data.results.map((number) => +number.selectedNumber);
        console.log(numbers);
        setSelectedNumbers(numbers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLottery();
  }, []);

  const handleSelectNumber = (number) => {
    setSelectedNumber(number);
  };

  return (
    <main className="make-lottery-container center-items">
      <h1>Apostar Rifas</h1>
      <div className="make-lottery-card center-items">
        {lotteryArray.map((number) => (
          <Button
            variant="primary-cta lottery-button"
            key={number}
            disabled={selectedNumbers.includes(+number)}
            onClick={() => handleSelectNumber(number)}
          >
            {number}
          </Button>
        ))}
      </div>
      {selectedNumber && (
        <div>
          <form method="POST" className="lottery-bet">
            <h2>HAZ TU APUESTA</h2>
            <div className="lottery-user-data">
              <FormInput
                disabled={isLoading}
                type="text"
                name="userName"
                label="Tu nombre"
              />
              <FormInput
                disabled={isLoading}
                type="email"
                name="userEmail"
                label="Tu mail"
              />
              <p>Número seleccionado: {selectedNumber}</p>
              <p>Precio de la apuesta: {lottery[0].betPrice}€</p>
            </div>

            <div className="submit-bet center-items">
              <Button type="submit" variant="primary-cta">
                {isLoading ? "Haciendo apuesta..." : "Apostar"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};
