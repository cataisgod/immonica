"use client";

import { useEffect, useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import {
  categories,
  conditions,
  housingTypes,
  properties,
  type CategoryKey,
} from "@/lib/properties";
import { emptyFilters, type Filters } from "@/lib/filters";

const sorts = [
  { value: "noi", label: "Cele mai noi" },
  { value: "pret-asc", label: "Preț crescător" },
  { value: "pret-desc", label: "Preț descrescător" },
  { value: "suprafata", label: "Suprafață mare" },
];

const withRooms: (CategoryKey | "")[] = ["", "apartamente", "case", "duplexuri"];

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className={`field${value ? " is-set" : ""}`}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function PropertyBrowser({ initial }: { initial: Filters }) {
  const [f, setF] = useState<Filters>(initial);
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((prev) => ({ ...prev, [k]: v }));

  // Filtrele stau în URL, ca o căutare să poată fi trimisă cuiva.
  useEffect(() => {
    const qs = new URLSearchParams();
    (Object.keys(f) as (keyof Filters)[]).forEach((k) => {
      if (f[k] && f[k] !== emptyFilters[k]) qs.set(k, f[k]);
    });
    const s = qs.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  }, [f]);

  const showRooms = withRooms.includes(f.categorie);
  const showHousing = f.categorie === "" || f.categorie === "apartamente";
  const showCondition = f.categorie !== "terenuri";

  const locations = useMemo(
    () =>
      [...new Set(properties.filter((p) => !f.categorie || p.category === f.categorie).map((p) => p.sector))].sort(
        (a, b) => a.localeCompare(b, "ro"),
      ),
    [f.categorie],
  );

  const results = useMemo(() => {
    const min = Number(f.pretMin) || 0;
    const max = Number(f.pretMax) || Infinity;
    const list = properties.filter((p) => {
      if (f.categorie && p.category !== f.categorie) return false;
      if (f.tranzactie && p.transaction !== f.tranzactie) return false;
      if (f.locatie && p.sector !== f.locatie) return false;
      if (showRooms && f.camere) {
        const n = Number(f.camere);
        if (!p.rooms || (n >= 4 ? p.rooms < 4 : p.rooms !== n)) return false;
      }
      if (showHousing && f.fond && p.housing !== f.fond) return false;
      if (showCondition && f.stare && p.condition !== f.stare) return false;
      if (p.price < min || p.price > max) return false;
      return true;
    });
    const sorted = [...list];
    if (f.sortare === "pret-asc") sorted.sort((a, b) => a.price - b.price);
    else if (f.sortare === "pret-desc") sorted.sort((a, b) => b.price - a.price);
    else if (f.sortare === "suprafata") sorted.sort((a, b) => b.area - a.area);
    else sorted.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    return sorted;
  }, [f, showRooms, showHousing, showCondition]);

  const cat = categories.find((c) => c.key === f.categorie);
  const title = cat ? cat.label : "Proprietăți";
  const subtitle =
    f.tranzactie === "vanzare" ? "de vânzare" : f.tranzactie === "chirie" ? "de închiriat" : "de vânzare și chirie";

  const dirty = (Object.keys(emptyFilters) as (keyof Filters)[]).some(
    (k) => k !== "categorie" && k !== "sortare" && f[k] !== emptyFilters[k],
  );

  const pickCategory = (key: CategoryKey | "") =>
    setF((prev) => ({ ...prev, categorie: key, locatie: "", camere: "", fond: "", stare: "" }));

  return (
    <>
      <section className="list-head container">
        <div className="tag">
          <span className="tag-dot" aria-hidden="true" />
          Catalog · Chișinău
        </div>
        <h1 className="h2 list-title">
          {title} <span className="muted">{subtitle}</span>
        </h1>

        <div className="cat-tabs" role="tablist" aria-label="Categorii">
          {[{ key: "" as const, label: "Toate" }, ...categories].map((c) => (
            <button
              key={c.key || "toate"}
              type="button"
              role="tab"
              aria-selected={f.categorie === c.key}
              className={`cat-tab${f.categorie === c.key ? " is-active" : ""}`}
              onClick={() => pickCategory(c.key)}
            >
              {c.label}
              <span className="cat-count">
                {c.key ? properties.filter((p) => p.category === c.key).length : properties.length}
              </span>
            </button>
          ))}
        </div>

        <div className="filters">
          <Select
            label="Tranzacție"
            value={f.tranzactie}
            onChange={(v) => set("tranzactie", v as Filters["tranzactie"])}
            options={[
              { value: "vanzare", label: "Vânzare" },
              { value: "chirie", label: "Chirie" },
            ]}
          />
          <Select
            label="Locație"
            value={f.locatie}
            onChange={(v) => set("locatie", v)}
            options={locations.map((l) => ({ value: l, label: l }))}
          />
          {showRooms && (
            <Select
              label="Nr. camere"
              value={f.camere}
              onChange={(v) => set("camere", v)}
              options={[
                { value: "1", label: "1 cameră" },
                { value: "2", label: "2 camere" },
                { value: "3", label: "3 camere" },
                { value: "4", label: "4+ camere" },
              ]}
            />
          )}
          {showHousing && (
            <Select
              label="Fond locativ"
              value={f.fond}
              onChange={(v) => set("fond", v)}
              options={housingTypes.map((h) => ({ value: h, label: h }))}
            />
          )}
          {showCondition && (
            <Select
              label="Stare imobil"
              value={f.stare}
              onChange={(v) => set("stare", v)}
              options={conditions.map((c) => ({ value: c, label: c }))}
            />
          )}
          <div className={`field field--price${f.pretMin || f.pretMax ? " is-set" : ""}`}>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Preț de la, €"
              aria-label="Preț minim în euro"
              value={f.pretMin}
              onChange={(e) => set("pretMin", e.target.value)}
            />
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="până la"
              aria-label="Preț maxim în euro"
              value={f.pretMax}
              onChange={(e) => set("pretMax", e.target.value)}
            />
          </div>
          {dirty && (
            <button type="button" className="reset" onClick={() => setF({ ...emptyFilters, categorie: f.categorie })}>
              Resetează ✕
            </button>
          )}
        </div>

        <div className="list-bar">
          <p className="caption">
            {results.length} {results.length === 1 ? "proprietate disponibilă" : "proprietăți disponibile"}
          </p>
          <label className="field field--sort">
            <span className="sr-only">Sortare</span>
            <select value={f.sortare} onChange={(e) => set("sortare", e.target.value)}>
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="container list-grid-wrap">
        {results.length ? (
          <div className="pgrid">
            {results.map((p, i) => (
              <PropertyCard key={p.id} p={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="caption">Nicio proprietate nu corespunde filtrelor alese.</p>
            <button type="button" className="pill-btn" onClick={() => setF({ ...emptyFilters })}>
              Vezi toate proprietățile
            </button>
          </div>
        )}
      </section>
    </>
  );
}
