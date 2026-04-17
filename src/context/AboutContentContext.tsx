import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const KAWADE_ABOUT_STORAGE_KEY = "kawade-gold-about-v1";

export interface ManufacturingStat {
  value: string;
  label: string;
}

export type AboutContentV1 = {
  version: 1;
  headerLabel: string;
  headerTitle: string;
  headerDescription: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  visionHeading: string;
  visionParagraph: string;
  futureHeading: string;
  futureParagraph: string;
  manufacturingStats: ManufacturingStat[];
  manufacturingImage: string;
  aboutImage: string;
  aboutYearsValue: string;
  aboutYearsLabel: string;
  phoneNumber1: string;
  phoneNumber2: string;
};

export function defaultAboutContent(): AboutContentV1 {
  return {
    version: 1,
    headerLabel: "Our Story",
    headerTitle: "About Kawade Gold Oils",
    headerDescription:
      "A legacy of purity, trust, and excellence in edible oil production spanning over two decades.",
    storyTitle: "About Kawade Gold Oils",
    storyParagraph1:
      "Kawade Gold Oils was founded in Maharashtra as an edible oil wholesale and distribution business, with a clear focus on delivering quality oils to retailers, small businesses, and commercial buyers.",
    storyParagraph2:
      "2026 — Launched our own brand, Radha Oil, marking our step towards building a trusted name in branded edible oil products. We continue to oversee packaging and quality control at every stage from sourcing to delivery.",
    visionHeading: "2027 — Vision",
    visionParagraph:
      "Expanding our distribution network across Maharashtra, aiming to serve a wider base of retailers and businesses.",
    futureHeading: "Future Vision",
    futureParagraph:
      "Our goal is to grow Kawade Gold Oils into a trusted and recognized brand across India, known for honesty, quality, and dependable service in the edible oil industry.",
    manufacturingStats: [
      { value: "25+", label: "Years" },
      { value: "4", label: "Packaging" },
      { value: "500+", label: "Tons/Month" },
    ],
    manufacturingImage: "/about-factory.jpg",
    aboutImage: "/about-factory.jpg",
    aboutYearsValue: "25+",
    aboutYearsLabel: "Years of Trust",
    phoneNumber1: "+91 74472 97953",
    phoneNumber2: "+91 8087503515",
  };
}

function parseStored(raw: string | null): AboutContentV1 {
  if (!raw) return defaultAboutContent();
  try {
    const data = JSON.parse(raw) as AboutContentV1;
    if (data?.version !== 1) return defaultAboutContent();
    return { ...defaultAboutContent(), ...data, version: 1 };
  } catch {
    return defaultAboutContent();
  }
}

function loadAboutContent(): AboutContentV1 {
  if (typeof window === "undefined") return defaultAboutContent();
  return parseStored(localStorage.getItem(KAWADE_ABOUT_STORAGE_KEY));
}

function saveAboutContent(state: AboutContentV1): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KAWADE_ABOUT_STORAGE_KEY, JSON.stringify(state));
}

type AboutContentContextValue = {
  content: AboutContentV1;
  setContent: (next: AboutContentV1) => void;
  patchContent: (patch: Partial<AboutContentV1>) => void;
  resetContent: () => void;
};

const AboutContentContext = createContext<AboutContentContextValue | null>(null);

export function AboutContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<AboutContentV1>(() => loadAboutContent());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KAWADE_ABOUT_STORAGE_KEY && e.newValue) {
        setContentState(parseStored(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setContent = useCallback((next: AboutContentV1) => {
    const normalized: AboutContentV1 = { ...defaultAboutContent(), ...next, version: 1 };
    setContentState(normalized);
    saveAboutContent(normalized);
  }, []);

  const patchContent = useCallback(
    (patch: Partial<AboutContentV1>) => {
      setContent({ ...content, ...patch, version: 1 });
    },
    [content, setContent],
  );

  const resetContent = useCallback(() => {
    setContent(defaultAboutContent());
  }, [setContent]);

  const value = useMemo(
    () => ({
      content,
      setContent,
      patchContent,
      resetContent,
    }),
    [content, patchContent, resetContent, setContent],
  );

  return <AboutContentContext.Provider value={value}>{children}</AboutContentContext.Provider>;
}

export function useAboutContent() {
  const ctx = useContext(AboutContentContext);
  if (!ctx) throw new Error("useAboutContent must be used within AboutContentProvider");
  return ctx;
}
