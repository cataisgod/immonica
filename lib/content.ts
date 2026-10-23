// Fotografii din proiectele Inside Global Group (inside-group.md, archinvest.md).
export const images = {
  hero1: { src: "/images/hero-fatada-conac.jpg", alt: "Fațada unui conac restaurat" },
  hero2: { src: "/images/hero-interior.jpg", alt: "Interior luminos cu ferestre înalte" },
  hero3: { src: "/images/hero-detaliu-fatada.jpg", alt: "Detaliu de fațadă cu fereastră și plante" },
  property: { src: "/images/vila-piscina.jpg", alt: "Vilă cu piscină și grădină" },
  banner: { src: "/images/banner-living.jpg", alt: "Living amenajat cu finisaje din beton ciré" },
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

export const contact = {
  email: "info@immonica.md",
  phone: "+373 68 898 998",
  phoneHref: "tel:+37368898998",
};

export const contactHref = `mailto:${contact.email}`;
