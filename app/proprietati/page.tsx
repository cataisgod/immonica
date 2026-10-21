import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyBrowser from "@/components/PropertyBrowser";
import { emptyFilters, type Filters } from "@/lib/filters";
import { categories } from "@/lib/properties";

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
        {/* key: un link nou spre /proprietati?... repornește filtrele de la zero */}
        <PropertyBrowser key={JSON.stringify(initial)} initial={initial} />
      </main>
      <Footer />
    </div>
  );
}
