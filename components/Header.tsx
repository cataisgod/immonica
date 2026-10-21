"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/proprietati", label: "Proprietăți" },
  { href: "/#servicii", label: "Servicii" },
  { href: "/#despre", label: "Despre noi" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav container${open ? " is-open" : ""}`}>
      <Link href="/" className="nav-logo" aria-label="Immonica — acasă">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/immonica-logo.svg" alt="Immonica" />
      </Link>

      <nav id="nav-links" className="nav-links" aria-label="Navigație principală">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            aria-current={pathname.startsWith(l.href) && l.href !== "/" ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        <Link href="/#contact" className="pill-btn" onClick={() => setOpen(false)}>
          Contact <span aria-hidden="true">→</span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Închide" : "Meniu"}
        </button>
      </div>
    </header>
  );
}
