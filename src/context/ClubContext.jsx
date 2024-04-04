import { createContext, useContext, useState } from "react";

const ClubContext = createContext();
const ClubContextProvider = ({ children }) => {
  const [currentClub, setCurrentClub] = useState();

  return (
    <ClubContext.Provider value={{ currentClub, setCurrentClub }}>
      {children}
    </ClubContext.Provider>
  );
};

const useClubContext = () => {
  const context = useContext(ClubContext);
  if (context === undefined)
    throw new Error("El contexto fue utlizado fuera del provider");
  return context;
};

export { ClubContextProvider, useClubContext };
