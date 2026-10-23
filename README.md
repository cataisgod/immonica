# Immonica — homepage

Landing page pentru agenția imobiliară Immonica (Inside Global Group), implementată
după handoff-ul de design „Immonica Home”.

Next.js 15 (App Router) · TypeScript · CSS simplu (`app/globals.css`) · font Geist.

```bash
npm install
npm run dev      # http://localhost:3001
npm run build && npm run start
```

## Unde se editează

| Ce | Fișier |
| --- | --- |
| Servicii, linkuri sociale, linkul de contact, imagini | `lib/content.ts` |
| Structura paginii (secțiuni) | `app/page.tsx` |
| Culori, tipografie, layout, responsive | `app/globals.css` |
| Proprietăți, agenți, categorii | `lib/properties.ts` |
| Catalogul `/proprietati` (categorii, filtre, sortare) | `components/PropertyBrowser.tsx` |
| Pagina unei proprietăți `/proprietati/[slug]` | `app/proprietati/[slug]/page.tsx` |
| Stilurile catalogului și ale paginii proprietății | `app/catalog.css` |
| Navigația (cu meniu pe mobil) | `components/Header.tsx` |
| Insigna rotativă din hero | `components/Badge.tsx` |
| Logo | `public/immonica-logo.svg` |

## Conținut

- Fotografiile din `public/images/` sunt din proiectele Inside Global Group
  (inside-group.md, archinvest.md).
- Contactul (info@immonica.md, +373 68 898 998) e definit o singură dată, în `lib/content.ts` → `contact`.
- Linkurile sociale din footer (`#`) sunt încă provizorii.
- **Catalogul de proprietăți e gol** (`properties = []` în `lib/properties.ts`), așa că `/proprietati`
  afișează „Proprietăți noi vor fi adăugate în cel mai scurt timp!”. Când adaugi primul obiect în
  listă, apar automat filtrele, cardurile și pagina proprietății. Un exemplu complet de proprietate
  e în commit-ul `30749a2`.
- Rata de ipotecă afișată pe proprietăți e estimativă: avans 30%, 20 de ani, dobândă 7,8% / an (`mortgage()`).
