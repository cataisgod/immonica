import { contact, socials } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/immonica-logo.svg" alt="Immonica" className="footer-logo" />
        <div className="footer-contact">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.phoneHref}>{contact.phone}</a>
        </div>
        <nav className="footer-links" aria-label="Rețele sociale">
          {socials.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </nav>
        <span className="footer-copy">© 2026 Immonica</span>
      </div>

      <div className="footer-credit container">
        <span>Designed and developed by Coreform</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/coreform-logo.svg" alt="Coreform" />
      </div>
    </footer>
  );
}
