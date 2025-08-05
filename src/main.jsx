import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import './index.css';

// import AppRoute;

import AppRoutes from "./Routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
