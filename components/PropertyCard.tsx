import Image from "next/image";
import Link from "next/link";
import { cardSpecs, formatNumber, formatPrice, mortgage, pricePerUnit, type Property } from "@/lib/properties";

export default function PropertyCard({ p, priority = false }: { p: Property; priority?: boolean }) {
  const rate = mortgage(p);
  const specs = cardSpecs(p).filter(Boolean);

  return (
    <Link href={`/proprietati/${p.slug}`} className="pcard">
      <div className="pcard-img">
        <Image
          src={p.images[0]}
          alt={p.headline}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pcard-badges">
          {p.transaction === "chirie" && <span className="label-pill">Chirie</span>}
          {p.isNew && <span className="label-pill">Nou</span>}
          {p.exclusive && <span className="label-pill label-pill--ink">Exclusiv</span>}
        </div>
      </div>

      <div className="pcard-body">
        <div className="pcard-price">{formatPrice(p)}</div>
        <div className="pcard-sub">
          {p.transaction === "vanzare" && pricePerUnit(p)}
          {rate && ` · Ipotecă ${formatNumber(rate)} € / lună`}
          {p.transaction === "chirie" && `${p.area} m² · ${p.sector}`}
        </div>
        <div className="pcard-loc">
          {p.sector}, {p.street}
        </div>
        <div className="pcard-specs">
          {specs.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
        <div className="pcard-foot">
          <span>ID {p.id}</span>
          <span className="pcard-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
