import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const serverEntry = pathToFileURL(path.join(rootDir, "dist-ssr", "entry-server.js"));

const template = await readFile(path.join(distDir, "index.html"), "utf-8");
const { getStaticPaths, render } = await import(serverEntry.href);

const rootMarker = '<div id="root"></div>';
const routes = getStaticPaths();

await Promise.all(
  routes.map(async (route) => {
    const appHtml = render(route);
    const html = template.replace(rootMarker, `<div id="root">${appHtml}</div>`);
    const filePath = routeToFilePath(route);

    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, html, "utf-8");
  }),
);

await rm(path.join(rootDir, "dist-ssr"), { recursive: true, force: true });

function routeToFilePath(route) {
  const normalized = normalizeRoute(route);

  if (normalized === "/") {
    return path.join(distDir, "index.html");
  }

  return path.join(distDir, normalized.slice(1), "index.html");
}

function normalizeRoute(route) {
  if (!route || route === "/") {
    return "/";
  }

  return `/${route.replace(/^\/+|\/+$/g, "")}/`;
}
