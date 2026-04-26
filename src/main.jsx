import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { I18nProvider } from "./hooks/useI18n";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <AppRouter />
    </I18nProvider>
  </React.StrictMode>,
);
