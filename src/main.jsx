import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClubContextProvider } from "./context/ClubContext.jsx";
import { BadgesContextProvider } from "./context/BadgesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BadgesContextProvider>
      <ClubContextProvider>
        <App />
      </ClubContextProvider>
    </BadgesContextProvider>
  </React.StrictMode>
);
