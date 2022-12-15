import React from "react";
import ReactDOM from "react-dom/client";
import { EndpointsProvider } from "./contexts/http-endpoints";
import { ContactsList } from "./views/contacts-list";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <EndpointsProvider>
      <ContactsList />
    </EndpointsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
