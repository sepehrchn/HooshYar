export const sectionIds = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/work": "work",
  "/process": "process",
  "/pricing": "pricing",
  "/contact": "contact",
} as const;

export function getSectionId(href: string) {
  return sectionIds[href as keyof typeof sectionIds] ?? href.replace(/^\//, "");
}

export function getSectionHref(locale: string, href: string) {
  const sectionId = getSectionId(href);
  const base = `/${locale}`;

  if (sectionId === "home") {
    return `${base}#home`;
  }

  return `${base}#${sectionId}`;
}
