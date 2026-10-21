"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const n = images.length;
  const go = (d: number) => setI((cur) => (cur + d + n) % n);
  const pad = (x: number) => String(x).padStart(2, "0");

  return (
    <div
      className="gallery"
      tabIndex={0}
      aria-label="Galerie foto — folosește săgețile pentru a naviga"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="gallery-main">
        {images.map((src, idx) => (
          <Image
            key={src + idx}
            src={src}
            alt={`${alt} — foto ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="(max-width: 1024px) 100vw, 70vw"
            className={idx === i ? "is-active" : ""}
          />
        ))}
        {n > 1 && (
          <>
            <button type="button" className="gallery-nav gallery-nav--prev" onClick={() => go(-1)} aria-label="Fotografia anterioară">
              ←
            </button>
            <button type="button" className="gallery-nav gallery-nav--next" onClick={() => go(1)} aria-label="Fotografia următoare">
              →
            </button>
          </>
        )}
        <span className="label-pill gallery-count">
          {pad(i + 1)} / {pad(n)}
        </span>
      </div>

      {n > 1 && (
        <div className="gallery-thumbs">
          {images.map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              className={`gallery-thumb${idx === i ? " is-active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Arată fotografia ${idx + 1}`}
              aria-current={idx === i}
            >
              <Image src={src} alt="" fill sizes="140px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
