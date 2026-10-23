// Catalogul de proprietăți: tipuri, categorii și date.
// Când va exista un backend, lista asta se înlocuiește cu un fetch, păstrând tipul `Property`.

export type CategoryKey = "apartamente" | "case" | "duplexuri" | "spatii-comerciale" | "terenuri";
export type Transaction = "vanzare" | "chirie";

export const categories: { key: CategoryKey; label: string; singular: string }[] = [
  { key: "apartamente", label: "Apartamente", singular: "Apartament" },
  { key: "case", label: "Case & vile", singular: "Casă" },
  { key: "duplexuri", label: "Duplexuri", singular: "Duplex" },
  { key: "spatii-comerciale", label: "Spații comerciale", singular: "Spațiu comercial" },
  { key: "terenuri", label: "Terenuri", singular: "Teren" },
];

export const conditions = [
  "Euroreparație",
  "Design individual",
  "Variantă albă",
  "Variantă sură",
  "Necesită reparație",
] as const;

export const housingTypes = ["Bloc nou", "Fond secundar"] as const;

export type Agent = { name: string; role: string; email: string };

export const agents: Record<string, Agent> = {
  immonica: { name: "Echipa Immonica", role: "Agenție imobiliară", email: "info@immonica.md" },
};

export type Property = {
  id: string;
  slug: string;
  category: CategoryKey;
  transaction: Transaction;
  title: string;
  sector: string;
  street: string;
  city: string;
  /** € pentru vânzare, € / lună pentru chirie */
  price: number;
  /** m² (la terenuri: ari) */
  area: number;
  rooms?: number;
  living?: boolean;
  baths?: number;
  /** apartamente / spații: etajul */
  floor?: number;
  /** apartamente / spații: etaje în bloc; case: nr. de niveluri */
  floors?: number;
  /** ari */
  landArea?: number;
  housing?: (typeof housingTypes)[number];
  condition?: (typeof conditions)[number];
  heating?: boolean;
  builder?: string;
  purpose?: string;
  utilities?: string;
  isNew?: boolean;
  exclusive?: boolean;
  views: number;
  postedAt: string;
  images: string[];
  headline: string;
  description: string;
  features: string[];
  nearby: string[];
  facilities: { name: string; distance: number }[];
  coords: [number, number];
  agent: keyof typeof agents;
};

// Lista e goală până când agenția are primele anunțuri. Cât e goală, /proprietati
// arată mesajul „Proprietăți noi vor fi adăugate în cel mai scurt timp!”.
// Un exemplu complet de proprietate se găsește în istoricul git (commit-ul 30749a2).
export const properties: Property[] = [];

/* ── Helpers ───────────────────────────────────────────── */

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const categoryOf = (key: CategoryKey) => categories.find((c) => c.key === key)!;

/** 97300 → "97 300" (spații neîntrerupte, identic pe server și client) */
export const formatNumber = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 1 }).replace(/,/g, " ").replace(".", ",");

export const formatPrice = (p: Property) =>
  `${formatNumber(p.price)} €${p.transaction === "chirie" ? " / lună" : ""}`;

export const areaUnit = (p: Property) => (p.category === "terenuri" ? "ari" : "m²");

export const pricePerUnit = (p: Property) =>
  `${formatNumber(Math.round(p.price / p.area))} € / ${p.category === "terenuri" ? "ar" : "m²"}`;

/** Rată lunară estimativă: avans 30%, 20 de ani, dobândă 7,8% / an. */
export const mortgage = (p: Property) => {
  if (p.transaction !== "vanzare" || p.category === "terenuri") return null;
  const loan = p.price * 0.7;
  const r = 0.078 / 12;
  const n = 240;
  return Math.round((loan * r) / (1 - Math.pow(1 + r, -n)));
};

export const roomsLabel = (p: Property) => {
  if (!p.rooms) return null;
  const base = p.rooms === 1 ? "1 cameră" : `${p.rooms} camere`;
  return p.living ? `${base} + living` : base;
};

export const floorLabel = (p: Property) => {
  if (p.floor === undefined) return null;
  const f = p.floor === 0 ? "Parter" : `${p.floor}`;
  return p.floors ? `${f}/${p.floors} etaje` : f;
};

export const bathsLabel = (p: Property) => (p.baths ? (p.baths === 1 ? "1 baie" : `${p.baths} băi`) : null);

/** Rândul scurt de pe card: „2 camere · 72 m² · 4/9 etaje · 2 băi” */
export const cardSpecs = (p: Property) => {
  const area = `${formatNumber(p.area)} ${areaUnit(p)}`;
  switch (p.category) {
    case "apartamente":
      return [roomsLabel(p), area, floorLabel(p), bathsLabel(p)];
    case "case":
    case "duplexuri":
      return [roomsLabel(p), area, p.landArea ? `teren ${formatNumber(p.landArea)} ari` : null, bathsLabel(p)];
    case "spatii-comerciale":
      return [p.purpose, area, floorLabel(p)];
    case "terenuri":
      return [area, p.purpose ? `pentru ${p.purpose.toLowerCase()}` : null];
  }
};

/** Toate criteriile, pentru pagina proprietății. */
export const detailSpecs = (p: Property) => {
  const rows: [string, string | null | undefined][] = [
    ["Locație", p.sector],
    ["Tranzacție", p.transaction === "vanzare" ? "Vânzare" : "Chirie"],
    ["Nr. camere", roomsLabel(p)],
    ["Fond locativ", p.housing],
    ["Stare imobil", p.condition],
    ["Suprafața", `${formatNumber(p.area)} ${areaUnit(p)}`],
    ["Suprafața terenului", p.landArea ? `${formatNumber(p.landArea)} ari` : null],
    [p.category === "case" || p.category === "duplexuri" ? "Nr. niveluri" : "Nivel", p.category === "case" || p.category === "duplexuri" ? (p.floors ? `${p.floors}` : null) : floorLabel(p)],
    ["Nr. băi", bathsLabel(p)],
    ["Încălzire autonomă", p.heating === undefined ? null : p.heating ? "Da" : "Nu"],
    ["Comp. de construcții", p.builder],
    ["Destinație", p.purpose],
    ["Comunicații", p.utilities],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
};
