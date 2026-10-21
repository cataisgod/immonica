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
| **Proprietăți (date demo), agenți, categorii** | `lib/properties.ts` |
| Catalogul `/proprietati` (categorii, filtre, sortare) | `components/PropertyBrowser.tsx` |
| Pagina unei proprietăți `/proprietati/[slug]` | `app/proprietati/[slug]/page.tsx` |
| Stilurile catalogului și ale paginii proprietății | `app/catalog.css` |
| Navigația (cu meniu pe mobil) | `components/Header.tsx` |
| Insigna rotativă din hero | `components/Badge.tsx` |
| Logo | `public/immonica-logo.svg` |

## Înainte de lansare

- Fotografiile sunt placeholdere demo de pe Unsplash. Înlocuiește-le cu pozele agenției
  (le poți pune în `public/` și schimba `src` în `lib/content.ts`).
- Linkurile sociale (`#`) și `mailto:contact@immonica.ro` sunt provizorii.
- Cele 15 proprietăți din `lib/properties.ts` sunt demo (adrese, prețuri, agenți inventați).
  Pentru o proprietate nouă se adaugă un obiect în lista `properties`; pagina ei se generează
  automat. Butoanele „Programează o vizionare”, „Oferă prețul tău” și „Solicită credit” deschid
  deocamdată un e-mail către agent.
- Rata de ipotecă afișată e estimativă: avans 30%, 20 de ani, dobândă 7,8% / an (`mortgage()`).
