import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App/App";
import "./styles/base.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

const app = <App pathname={window.location.pathname} />;

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
