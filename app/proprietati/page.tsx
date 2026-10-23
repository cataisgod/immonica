import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyBrowser from "@/components/PropertyBrowser";
import { emptyFilters, type Filters } from "@/lib/filters";
import { contact, contactHref } from "@/lib/content";
import { categories, properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Proprietăți de vânzare și chirie — Immonica",
  description:
    "Apartamente, case, duplexuri, spații comerciale și terenuri în Chișinău, selectate și verificate de agenția Immonica.",
};

type Search = Promise<Record<string, string | string[] | undefined>>;

export default async function PropertiesPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const initial: Filters = { ...emptyFilters };
  (Object.keys(emptyFilters) as (keyof Filters)[]).forEach((k) => {
    const v = sp[k];
    if (typeof v === "string") (initial as Record<string, string>)[k] = v;
  });
  if (initial.categorie && !categories.some((c) => c.key === initial.categorie)) initial.categorie = "";

  return (
    <div className="page">
      <Header />
      <main>
        {properties.length ? (
          /* key: un link nou spre /proprietati?... repornește filtrele de la zero */
          <PropertyBrowser key={JSON.stringify(initial)} initial={initial} />
        ) : (
          <section className="soon container">
            <h1 className="h1 soon-title">
              Proprietăți noi <span className="muted">vor fi adăugate în cel mai scurt timp!</span>
            </h1>
            <p className="caption soon-lead">
              Până atunci, spune-ne ce cauți și te anunțăm primii când apare proprietatea potrivită.
            </p>
            <div className="soon-actions">
              <a href={contactHref} className="pill-btn pill-btn--solid">
                {contact.email} <span aria-hidden="true">→</span>
              </a>
              <a href={contact.phoneHref} className="pill-btn">
                {contact.phone}
              </a>
              <Link href="/" className="pill-btn pill-btn--light">
                Înapoi acasă
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
