import { socials } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/immonica-logo.svg" alt="Immonica" className="footer-logo" />
        <nav className="footer-links" aria-label="Rețele sociale">
          {socials.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </nav>
        <span className="footer-copy">© 2026 Immonica</span>
      </div>
    </footer>
  );
}
