"use client";

import { useState } from "react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* utilizatorul a închis fereastra */
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" className="pill-btn pill-btn--light" onClick={share}>
      {copied ? "Link copiat" : "Distribuie"} <span aria-hidden="true">↗</span>
    </button>
  );
}
