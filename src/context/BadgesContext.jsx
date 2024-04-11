import { createContext, useContext, useState } from "react";

const BadgesContext = createContext();
const BadgesContextProvider = ({ children }) => {
  const [currentBadges, setCurrentBadges] = useState();

  const getBadge = (teamName) => {
    const team = currentBadges.filter((team) => team.name === teamName);
    return team.badge;
  };

  return (
    <BadgesContext.Provider
      value={{ currentBadges, setCurrentBadges, getBadge }}
    >
      {children}
    </BadgesContext.Provider>
  );
};

const useBadgesContext = () => {
  const context = useContext(BadgesContext);
  if (context === undefined)
    throw new Error("El contexto fue utilizado fuera del provider");
  return context;
};

export { BadgesContextProvider, useBadgesContext };
