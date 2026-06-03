const basePath = normalizeBasePath(import.meta.env.BASE_URL);

export function hrefFor(route: string) {
  if (route.startsWith("#")) {
    return route;
  }

  if (route === "/") {
    return basePath;
  }

  return `${basePath}${route.replace(/^\/+/, "")}`;
}

export function pathnameWithoutBase(pathname: string) {
  const cleanPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (basePath === "/") {
    return cleanPathname;
  }

  const baseWithoutSlash = basePath.slice(0, -1);

  if (cleanPathname === baseWithoutSlash) {
    return "/";
  }

  if (cleanPathname.startsWith(basePath)) {
    return `/${cleanPathname.slice(basePath.length)}`;
  }

  return cleanPathname;
}

function normalizeBasePath(value: string) {
  if (!value || value === "." || value === "./") {
    return "/";
  }

  const path = value.startsWith("/") ? value : `/${value}`;

  return path.endsWith("/") ? path : `${path}/`;
}
