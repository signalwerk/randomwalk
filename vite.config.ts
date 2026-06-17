import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { extractFrontmatter, htmlProcessor } from "signalwerk.md/src/processor.js";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(rootDir, "content");
const logDir = path.join(contentDir, "log");
const topicsDir = path.join(contentDir, "topics");
const virtualContentModuleId = "virtual:content";
const resolvedVirtualContentModuleId = `\0${virtualContentModuleId}`;

export default defineConfig({
  base: normalizeBasePath(process.env.BASE_PATH),
  plugins: [react(), signalwerkContentPlugin()],
});

function signalwerkContentPlugin(): Plugin {
  return {
    name: "signalwerk-content",
    resolveId(id) {
      if (id === virtualContentModuleId) {
        return resolvedVirtualContentModuleId;
      }

      return undefined;
    },
    load(id) {
      if (id !== resolvedVirtualContentModuleId) {
        return undefined;
      }

      const logPosts = readLogPosts();
      const topics = readTopics();
      const seasons = getSeasons(logPosts);
      const staticRoutes = [
        "/",
        "/topics/",
        ...seasons.map((season) => `/log/${season}/`),
        ...logPosts.map((post) => post.path),
        ...topics.map((topic) => topic.path),
      ];

      for (const document of [...logPosts, ...topics]) {
        this.addWatchFile(path.join(rootDir, document.sourcePath));
      }

      return [
        `export const logPosts = ${JSON.stringify(logPosts)};`,
        `export const topics = ${JSON.stringify(topics)};`,
        `export const staticRoutes = ${JSON.stringify(staticRoutes)};`,
      ].join("\n");
    },
    configureServer(server) {
      server.watcher.add(contentDir);
      server.watcher.on("all", (_eventName, changedPath) => {
        if (!isMarkdownPath(changedPath) || !isInside(changedPath, contentDir)) {
          return;
        }

        const mod = server.moduleGraph.getModuleById(resolvedVirtualContentModuleId);

        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }

        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

type ContentCollection = "log" | "topics";

type GeneratedDocument = {
  collection: ContentCollection;
  date?: string;
  html: string;
  intro?: string;
  path: string;
  season?: string;
  slug: string;
  sourcePath: string;
  title: string;
};

function readLogPosts() {
  return readCollection(logDir, "log");
}

function readTopics() {
  return readCollection(topicsDir, "topics");
}

function readCollection(directory: string, collection: ContentCollection) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return listMarkdownFiles(directory)
    .map((filePath) => toDocument(filePath, collection))
    .filter((document): document is GeneratedDocument => Boolean(document))
    .sort(compareDocuments);
}

function listMarkdownFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return listMarkdownFiles(entryPath);
    }

    return isMarkdownPath(entryPath) ? [entryPath] : [];
  });
}

function toDocument(
  filePath: string,
  collection: ContentCollection,
): GeneratedDocument | null {
  const sourcePath = path.relative(rootDir, filePath);
  const markdown = fs.readFileSync(filePath, "utf-8");
  const { attributes, body } = extractFrontmatter(markdown);
  const processed = htmlProcessor().processSync(body);
  const renderedTitle = getString(processed.data.title);
  const title = getString(attributes.title) || renderedTitle || "Untitled";
  const preferredSlug = getString(attributes.slug);
  const slug = slugify(preferredSlug || title);
  const season = collection === "log" ? getSeason(sourcePath) : undefined;

  if (collection === "log" && !season) {
    return null;
  }

  return {
    collection,
    date: getString(attributes.date),
    html: processed.toString(),
    intro: getString(attributes.intro),
    path: collection === "log" ? `/log/${season}/${slug}/` : `/topics/${slug}/`,
    ...(season ? { season } : {}),
    slug,
    sourcePath,
    title,
  };
}

function getSeason(sourcePath: string) {
  return sourcePath.match(/content\/log\/([^/]+)\//)?.[1];
}

function getSeasons(posts: GeneratedDocument[]) {
  return Array.from(
    new Set(posts.flatMap((post) => post.season ?? [])),
  ).sort((a, b) => b.localeCompare(a));
}

function getString(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return undefined;
}

function compareDocuments(a: GeneratedDocument, b: GeneratedDocument) {
  const aTime = getTime(a.date);
  const bTime = getTime(b.date);

  if (aTime !== bTime) {
    return bTime - aTime;
  }

  return a.title.localeCompare(b.title);
}

function getTime(date?: string) {
  if (!date) {
    return 0;
  }

  const time = Date.parse(date);
  return Number.isFinite(time) ? time : 0;
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isMarkdownPath(filePath: string) {
  return filePath.endsWith(".md");
}

function isInside(filePath: string, directory: string) {
  const relativePath = path.relative(directory, filePath);
  return Boolean(relativePath) && !relativePath.startsWith("..");
}

function normalizeBasePath(value?: string) {
  if (!value || value === "." || value === "./") {
    return "/";
  }

  const path = value.startsWith("/") ? value : `/${value}`;

  return path.endsWith("/") ? path : `${path}/`;
}
