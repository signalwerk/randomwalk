import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { extractFrontmatter, htmlProcessor } from "signalwerk.md/src/processor.js";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(rootDir, "content", "log");
const virtualPostsModuleId = "virtual:posts";
const resolvedVirtualPostsModuleId = `\0${virtualPostsModuleId}`;

export default defineConfig({
  base: normalizeBasePath(process.env.BASE_PATH),
  plugins: [react(), signalwerkPostsPlugin()],
});

function signalwerkPostsPlugin(): Plugin {
  return {
    name: "signalwerk-posts",
    resolveId(id) {
      if (id === virtualPostsModuleId) {
        return resolvedVirtualPostsModuleId;
      }

      return undefined;
    },
    load(id) {
      if (id !== resolvedVirtualPostsModuleId) {
        return undefined;
      }

      const posts = readPosts();
      const years = getYears(posts);
      const staticRoutes = [
        "/",
        ...years.map((year) => `/log/${year}/`),
        ...posts.map((post) => `/log/${post.year}/${post.slug}/`),
      ];

      for (const post of posts) {
        this.addWatchFile(path.join(rootDir, post.sourcePath));
      }

      return [
        `export const posts = ${JSON.stringify(posts)};`,
        `export const staticRoutes = ${JSON.stringify(staticRoutes)};`,
      ].join("\n");
    },
    configureServer(server) {
      server.watcher.add(postsDir);
      server.watcher.on("all", (_eventName, changedPath) => {
        if (!isMarkdownPath(changedPath) || !isInside(changedPath, postsDir)) {
          return;
        }

        const mod = server.moduleGraph.getModuleById(resolvedVirtualPostsModuleId);

        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }

        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

type GeneratedPost = {
  date?: string;
  html: string;
  intro?: string;
  slug: string;
  sourcePath: string;
  title: string;
  year: string;
};

function readPosts() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return listMarkdownFiles(postsDir)
    .map(toPost)
    .filter((post): post is GeneratedPost => Boolean(post))
    .sort(comparePosts);
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

function toPost(filePath: string): GeneratedPost | null {
  const sourcePath = path.relative(rootDir, filePath);
  const year = getYear(sourcePath);

  if (!year) {
    return null;
  }

  const markdown = fs.readFileSync(filePath, "utf-8");
  const { attributes, body } = extractFrontmatter(markdown);
  const processed = htmlProcessor().processSync(body);
  const renderedTitle = getString(processed.data.title);
  const title = getString(attributes.title) || renderedTitle || "Untitled";
  const preferredSlug = getString(attributes.slug);

  return {
    date: getString(attributes.date),
    html: processed.toString(),
    intro: getString(attributes.intro),
    slug: slugify(preferredSlug || title),
    sourcePath,
    title,
    year,
  };
}

function getYear(sourcePath: string) {
  return sourcePath.match(/content\/log\/([^/]+)\//)?.[1];
}

function getYears(posts: GeneratedPost[]) {
  return Array.from(new Set(posts.map((post) => post.year))).sort((a, b) =>
    b.localeCompare(a),
  );
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

function comparePosts(a: GeneratedPost, b: GeneratedPost) {
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
