import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import PropertyCard from "@/components/PropertyCard";
import ShareButton from "@/components/ShareButton";
import {
  agents,
  categoryOf,
  detailSpecs,
  formatNumber,
  formatPrice,
  getProperty,
  mortgage,
  pricePerUnit,
  properties,
} from "@/lib/properties";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProperty((await params).slug);
  if (!p) return {};
  return {
    title: `${p.headline} — Immonica`,
    description: p.description.slice(0, 160),
    openGraph: { images: [p.images[0]] },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });

const mailto = (to: string, subject: string) => `mailto:${to}?subject=${encodeURIComponent(subject)}`;

export default async function PropertyPage({ params }: { params: Params }) {
  const p = getProperty((await params).slug);
  if (!p) notFound();

  const cat = categoryOf(p.category);
  const agent = agents[p.agent];
  const rate = mortgage(p);
  const specs = detailSpecs(p);
  const ref = `${cat.singular}, ${p.sector} — ID ${p.id}`;
  const [lat, lng] = p.coords;
  const bbox = [lng - 0.012, lat - 0.006, lng + 0.012, lat + 0.006].join(",");

  const similar = [
    ...properties.filter((o) => o.id !== p.id && o.category === p.category),
    ...properties.filter((o) => o.id !== p.id && o.category !== p.category),
  ].slice(0, 3);

  return (
    <div className="page">
      <Header />

      <main>
        <section className="container prop-head">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/proprietati">Proprietăți</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/proprietati?categorie=${p.category}`}>{cat.label}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/proprietati?categorie=${p.category}&locatie=${encodeURIComponent(p.sector)}`}>{p.sector}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{p.street}</span>
          </nav>

          <div className="prop-title-row">
            <h1 className="prop-title">{p.title}</h1>
            <ShareButton title={p.title} />
          </div>

          <div className="prop-meta">
            <span>ID {p.id}</span>
            <span>{p.views} vizualizări</span>
            <span>Publicat {formatDate(p.postedAt)}</span>
            {p.isNew && <span className="label-pill">Nou</span>}
            {p.exclusive && <span className="label-pill label-pill--ink">Exclusiv</span>}
          </div>
        </section>

        <section className="container">
          <Gallery images={p.images} alt={p.headline} />
        </section>

        <section className="container prop-layout">
          <div className="prop-main">
            <div className="prop-block">
              <h2 className="prop-h">Caracteristici</h2>
              <dl className="specs">
                {specs.map(([label, value]) => (
                  <div key={label} className="spec">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="prop-block">
              <h2 className="prop-h">Descriere</h2>
              <p className="prop-lead">{p.headline}</p>
              <p className="prop-text">{p.description}</p>
              <ul className="dash-list">
                {p.features.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="prop-text">
                <strong>În apropiere:</strong> {p.nearby.join(", ")}.
              </p>
              {rate && (
                <p className="prop-note">
                  Poți cumpăra această proprietate în credit cu doar <strong>30% avans</strong> — rată estimativă de{" "}
                  <strong>{formatNumber(rate)} € / lună</strong>.
                </p>
              )}
            </div>

            {p.exclusive && (
              <div className="exclusive">
                <span className="label-pill">Ofertă exclusivă</span>
                <p>
                  Această proprietate este reprezentată în exclusivitate de Immonica — singura agenție autorizată să o
                  promoveze și să o vândă. Toate informațiile sunt verificate, iar vizionările se programează direct cu
                  agentul responsabil.
                </p>
              </div>
            )}

            <div className="prop-block">
              <h2 className="prop-h">De ce prin Immonica</h2>
              <p className="prop-text">
                Clienții care cumpără prin Immonica beneficiază de servicii imobiliare complete, fără costuri ascunse:
              </p>
              <ul className="dash-list">
                <li>consultanță privind prețurile reale de piață;</li>
                <li>verificarea juridică și pregătirea actelor pentru tranzacție;</li>
                <li>sprijin în obținerea unui credit ipotecar;</li>
                <li>asistență pe tot parcursul vânzării-cumpărării — economisești timp, nervi și bani.</li>
              </ul>
            </div>

            <div className="prop-block">
              <h2 className="prop-h">Facilități în zonă</h2>
              <ul className="facilities">
                {p.facilities.map((f) => (
                  <li key={f.name}>
                    <span>{f.name}</span>
                    <span className="caption">{f.distance >= 1000 ? `${formatNumber(f.distance / 1000)} km` : `${f.distance} m`}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="prop-aside">
            <div className="price-card">
              <div className="price-card-price">{formatPrice(p)}</div>
              <div className="caption">
                {p.transaction === "vanzare" ? pricePerUnit(p) : `${p.area} m² · ${p.sector}`}
                {rate && (
                  <>
                    <br />
                    Ipotecă {formatNumber(rate)} € / lună
                  </>
                )}
              </div>

              <div className="agent">
                <span className="agent-avatar" aria-hidden="true">
                  {agent.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <div className="agent-role">{agent.role}</div>
                  <div className="agent-name">{agent.name}</div>
                </div>
              </div>

              <div className="price-card-actions">
                <a href={mailto(agent.email, `Vizionare: ${ref}`)} className="pill-btn pill-btn--solid">
                  Programează o vizionare <span aria-hidden="true">→</span>
                </a>
                <div className="price-card-pair">
                  <a href={mailto(agent.email, `Ofertă de preț: ${ref}`)} className="pill-btn">
                    Oferă prețul tău
                  </a>
                  {rate && (
                    <a href={mailto(agent.email, `Solicitare credit: ${ref}`)} className="pill-btn">
                      Solicită credit
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="map">
              <iframe
                title={`Hartă — ${p.sector}, ${p.street}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
                loading="lazy"
              />
              <div className="map-caption caption">
                {p.sector}, {p.street}, {p.city}
              </div>
            </div>
          </aside>
        </section>

        <section className="container similar">
          <div className="services-head">
            <h2 className="h2">Similare</h2>
            <Link href={`/proprietati?categorie=${p.category}`} className="pill-btn">
              Toate: {cat.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="pgrid">
            {similar.map((o) => (
              <PropertyCard key={o.id} p={o} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
