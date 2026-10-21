// Fotografiile sunt placeholdere demo de pe Unsplash (licență gratuită).
// Se înlocuiesc cu pozele agenției înainte de lansare.
const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&w=${w}&auto=format&fit=crop`;

export const images = {
  hero1: { src: unsplash("1762344687143-e04778bc6316", 1800), alt: "Fațada unei clădiri rezidențiale", credit: "Zulfugar Karimov" },
  hero2: { src: unsplash("1783685158043-c18472c7f16e", 1200), alt: "Detaliu de intrare", credit: "Alexander Kaufmann" },
  hero3: { src: unsplash("1774770256885-fdd28b498454", 1200), alt: "Detaliu de arhitectură", credit: "Fabian Kleiser" },
  property: { src: unsplash("1613977257363-707ba9348227", 2000), alt: "Vilă modernă", credit: "John Fornander" },
  banner: { src: unsplash("1748679979638-e02b2df71540", 2400), alt: "Interior luminos", credit: "The Prototype" },
};

export const propertyTypes = [
  { title: "Apartamente", desc: "Garsoniere, 2–4 camere, penthouse-uri", href: "/proprietati?categorie=apartamente" },
  { title: "Case & vile", desc: "Case individuale, duplexuri, vile cu curte", href: "/proprietati?categorie=case" },
];

export const services = [
  { n: "01", title: "Vânzare", desc: "Promovăm proprietatea ta către cumpărătorii potriviți." },
  { n: "02", title: "Închiriere", desc: "Găsim chiriași de încredere și gestionăm contractul." },
  { n: "03", title: "Evaluare", desc: "Stabilim un preț corect, bazat pe piața reală." },
  { n: "04", title: "Consultanță", desc: "Te ghidăm la acte, credit și negociere." },
];

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
];

export const contactHref = "mailto:contact@immonica.ro";
