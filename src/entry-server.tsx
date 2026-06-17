import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App/App";
import { getStaticRoutes } from "./lib/content";
import "./styles/base.scss";

export function render(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}

export function getStaticPaths() {
  return getStaticRoutes();
}
