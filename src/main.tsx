import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import "./styles/main.scss";

// Create the root element for the app
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    {/* Provide user context to the entire app */}
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
