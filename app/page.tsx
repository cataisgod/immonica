import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import Footer from "@/components/Footer";
import { contactHref, images, propertyTypes, services } from "@/lib/content";

export default function Home() {
  return (
    <div className="page">
      <Header />

      <main>
        {/* Hero */}
        <section className="hero container">
          <div className="tag">
            <span className="tag-dot" aria-hidden="true" />
            Agenție imobiliară · Inside Global Group
          </div>

          <div className="hero-row">
            <h1 className="h1">
              <span className="muted">Găsește</span> casa
              <br />
              <span className="muted">în care</span> vei trăi
            </h1>
            <div className="hero-aside">
              <p className="caption hero-lead">
                Proprietăți atent selectate, în zone căutate, pentru un stil de viață pe măsura ta.
              </p>
              <Badge />
            </div>
          </div>

          <div id="proprietati" className="hero-images">
            <div className="hero-img" style={{ height: "100%" }}>
              <Image src={images.hero1.src} alt={images.hero1.alt} fill priority sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
            <div className="hero-img" style={{ height: "86%" }}>
              <Image src={images.hero2.src} alt={images.hero2.alt} fill priority sizes="(max-width: 640px) 50vw, 25vw" />
            </div>
            <div className="hero-img" style={{ height: "72%" }}>
              <Image src={images.hero3.src} alt={images.hero3.alt} fill priority sizes="(max-width: 640px) 50vw, 25vw" />
            </div>
          </div>
        </section>

        {/* Despre noi */}
        <section id="despre" className="about container">
          <h2 className="h2 center">
            Trăieș<span className="muted">te</span> frumos
            <br />
            <span className="muted">Inves</span>tește inteligent
          </h2>
          <div className="statement">
            <p>
              Credem că o casă înseamnă mai mult decât pereți și ferestre. Este locul în care îți construiești
              viața. Suntem o agenție tânără, construită pe încredere, transparență și atenție la detalii. Te
              însoțim de la prima vizionare până la semnarea contractului.
            </p>
          </div>
        </section>

        {/* Proprietăți */}
        <section className="casa">
          <div className="casa-inner container">
            <div className="casa-img">
              <Image src={images.property.src} alt={images.property.alt} fill sizes="(max-width: 860px) 100vw, 60vw" />
            </div>
            <div className="casa-text">
              <div className="tag">
                <span className="tag-dot" aria-hidden="true" />
                Proprietăți
              </div>
              <h2 className="casa-title">
                Casa potrivită <span className="muted">pentru fiecare etapă</span>
              </h2>
              <p className="caption">
                Fie că îți cauți primul apartament sau o vilă pentru familie, selectăm doar proprietăți pe care
                le-am verificat personal, în zone cu potențial real.
              </p>
              <ul className="casa-types">
                {propertyTypes.map((t) => (
                  <li key={t.title}>
                    <Link href={t.href} className="casa-type">
                      <span>{t.title}</span>
                      <span className="caption">{t.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/proprietati" className="pill-btn">
                Vezi proprietățile <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Servicii */}
        <section id="servicii" className="services container">
          <div className="services-head">
            <h2 className="h2">Servicii</h2>
            <p className="caption services-lead">
              Tot ce ai nevoie pentru o tranzacție sigură, într-un singur loc.
            </p>
          </div>
          <ul className="services-list">
            {services.map((s) => (
              <li key={s.n}>
                <a href="#contact" className="service-row">
                  <span className="service-n">{s.n}</span>
                  <span className="service-title">{s.title}</span>
                  <span className="caption service-desc">{s.desc}</span>
                  <span className="service-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Banner */}
        <section className="banner" aria-label="Immonica">
          <Image src={images.banner.src} alt={images.banner.alt} fill sizes="100vw" />
          <div className="banner-word banner-word--top" aria-hidden="true">IMMONICA</div>
          <div className="banner-word banner-word--bottom" aria-hidden="true">IMMONICA</div>
        </section>

        {/* CTA */}
        <section id="contact" className="cta container">
          <h2 className="h2 cta-title">
            <span>Cauți să-ți cumperi</span>
            <span className="cta-line">
              <span>o casă</span>
              <a href={contactHref} className="pill-btn cta-btn">
                Programează o întâlnire <span aria-hidden="true">→</span>
              </a>
              <span>nouă?</span>
            </span>
          </h2>
        </section>
      </main>

      <Footer />
    </div>
  );
}
