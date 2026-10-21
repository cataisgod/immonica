// Date demo pentru catalogul de proprietăți. Pozele sunt de pe Unsplash.
// Când va exista un backend, lista asta se înlocuiește cu un fetch, păstrând tipul `Property`.

export type CategoryKey = "apartamente" | "case" | "duplexuri" | "spatii-comerciale" | "terenuri";
export type Transaction = "vanzare" | "chirie";

export const categories: { key: CategoryKey; label: string; singular: string }[] = [
  { key: "apartamente", label: "Apartamente", singular: "Apartament" },
  { key: "case", label: "Case & vile", singular: "Casă" },
  { key: "duplexuri", label: "Duplexuri", singular: "Duplex" },
  { key: "spatii-comerciale", label: "Spații comerciale", singular: "Spațiu comercial" },
  { key: "terenuri", label: "Terenuri", singular: "Teren" },
];

export const conditions = [
  "Euroreparație",
  "Design individual",
  "Variantă albă",
  "Variantă sură",
  "Necesită reparație",
] as const;

export const housingTypes = ["Bloc nou", "Fond secundar"] as const;

export type Agent = { name: string; role: string; email: string };

export const agents: Record<string, Agent> = {
  ana: { name: "Ana Rusu", role: "Agent imobiliar", email: "ana.rusu@immonica.ro" },
  mihai: { name: "Mihai Ceban", role: "Agent imobiliar senior", email: "mihai.ceban@immonica.ro" },
  elena: { name: "Elena Popa", role: "Consultant comercial", email: "elena.popa@immonica.ro" },
};

export type Property = {
  id: string;
  slug: string;
  category: CategoryKey;
  transaction: Transaction;
  title: string;
  sector: string;
  street: string;
  city: string;
  /** € pentru vânzare, € / lună pentru chirie */
  price: number;
  /** m² (la terenuri: ari) */
  area: number;
  rooms?: number;
  living?: boolean;
  baths?: number;
  /** apartamente / spații: etajul */
  floor?: number;
  /** apartamente / spații: etaje în bloc; case: nr. de niveluri */
  floors?: number;
  /** ari */
  landArea?: number;
  housing?: (typeof housingTypes)[number];
  condition?: (typeof conditions)[number];
  heating?: boolean;
  builder?: string;
  purpose?: string;
  utilities?: string;
  isNew?: boolean;
  exclusive?: boolean;
  views: number;
  postedAt: string;
  images: string[];
  headline: string;
  description: string;
  features: string[];
  nearby: string[];
  facilities: { name: string; distance: number }[];
  coords: [number, number];
  agent: keyof typeof agents;
};

const img = (id: string) => `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&w=1800&auto=format&fit=crop`;

const I = {
  blockA: img("1574362848149-11496d93a7c7"),
  blockB: img("1545324418-cc1a3fa10c00"),
  livingWarm: img("1618221195710-dd6b41faaea6"),
  livingBright: img("1522708323590-d24dbb6b0267"),
  livingBlue: img("1493809842364-78817add7ffb"),
  livingPlants: img("1502672260266-1c1ef2d93688"),
  livingOpen: img("1560448204-e02f11c3d0e2"),
  livingWhite: img("1505691938895-1758d7feb511"),
  livingGrey: img("1600210492486-724fe5c67fb0"),
  livingLoft: img("1600607687939-ce8a6c25118c"),
  livingCognac: img("1554995207-c18c203602cb"),
  sofaSimple: img("1484101403633-562f891dc89a"),
  armchair: img("1586023492125-27b2c045efd7"),
  dining: img("1560185007-cde436f6a4d0"),
  kitchen: img("1484154218962-a197022b5858"),
  bedroomDark: img("1616594039964-ae9021a400a0"),
  bedroomWhite: img("1595526114035-0d45ed16cfbf"),
  bedroomClassic: img("1560185893-a55cbc8c57e8"),
  stairs: img("1502005229762-cf1b2da7c5d6"),
  emptyRoom: img("1630699144867-37acec97df5a"),
  minimalCorner: img("1519710164239-da123dc03ef4"),
  houseNight: img("1568605114967-8130f3a36994"),
  houseCountry: img("1570129477492-45c003edd2be"),
  houseBrick: img("1449844908441-8829872d2607"),
  houseWhiteRoof: img("1583608205776-bfd35f0d9f83"),
  porch: img("1560184897-ae75f418493e"),
  villaPool: img("1580587771525-78b9dba3b914"),
  villaPoolB: img("1613490493576-7fde63acd811"),
  villaPoolC: img("1600596542815-ffad4c1539a9"),
  duplexWood: img("1600047509807-ba8f99d2cdde"),
  duplexConcrete: img("1600566753190-17f0baa2a6c3"),
  duplexStone: img("1628744448840-55bdb2497bd4"),
  officeLoft: img("1497366811353-6870744d04b2"),
  officeOpen: img("1497366216548-37526070297c"),
  lounge: img("1524758631624-e2822e304c36"),
  shop: img("1441986300917-64674bd600d8"),
  field: img("1500382017468-9049fed747ef"),
  farm: img("1500076656116-558758c991c1"),
};

const residentialFacilities = (school: number, kinder: number, market: number) => [
  { name: "Școală", distance: school },
  { name: "Grădiniță", distance: kinder },
  { name: "Supermarket", distance: market },
  { name: "Farmacie", distance: 300 },
  { name: "Teren de joacă", distance: 150 },
  { name: "Parcare", distance: 50 },
  { name: "Transport public", distance: 200 },
];

export const properties: Property[] = [
  {
    id: "100101",
    slug: "100101-apartament-3-camere-living-buiucani",
    category: "apartamente",
    transaction: "vanzare",
    title: "Bloc nou, Buiucani, str. Ioana Radu — 3 camere + living, euroreparație și priveliște",
    sector: "Buiucani",
    street: "str. Ioana Radu",
    city: "Chișinău",
    price: 168000,
    area: 112,
    rooms: 3,
    living: true,
    baths: 2,
    floor: 7,
    floors: 10,
    housing: "Bloc nou",
    condition: "Euroreparație",
    heating: true,
    builder: "Inamstro",
    isNew: true,
    exclusive: true,
    views: 214,
    postedAt: "2026-10-17",
    images: [I.blockA, I.livingWarm, I.livingBright, I.kitchen, I.bedroomDark, I.bedroomWhite, I.dining],
    headline: "Apartament de 112 m² în bloc nou — priveliște, terasă și confort, Buiucani",
    description:
      "Spre vânzare apartament spațios cu suprafața totală de 112 m², situat la etajul 7 din 10, într-un bloc nou construit de compania Inamstro, în sectorul Buiucani. Locuința este compartimentată în 3 camere, living, bucătărie, 2 blocuri sanitare și balcon. Se oferă în euroreparație, mobilat și utilat cu tehnică de uz casnic, gata de mutare.",
    features: [
      "euroreparație, locuință îngrijită",
      "încălzire autonomă + încălzire prin pardoseală",
      "geamuri termopan panoramice",
      "sistem de aer condiționat",
      "mobilă și tehnică de uz casnic incluse",
      "parchet, uși din lemn, ușă blindată",
      "ascensor și loc de parcare subteran",
    ],
    nearby: ["Centru comercial", "Transport public", "Farmacie", "Grădiniță", "Școală", "Parc"],
    facilities: residentialFacilities(500, 400, 200),
    coords: [47.0335, 28.8005],
    agent: "ana",
  },
  {
    id: "100102",
    slug: "100102-apartament-1-camera-botanica",
    category: "apartamente",
    transaction: "vanzare",
    title: "Bloc nou, Botanica, str. Decebal — 1 cameră, variantă albă, ideal pentru investiție",
    sector: "Botanica",
    street: "str. Decebal",
    city: "Chișinău",
    price: 52700,
    area: 42,
    rooms: 1,
    baths: 1,
    floor: 3,
    floors: 9,
    housing: "Bloc nou",
    condition: "Variantă albă",
    heating: true,
    builder: "Exfactor Grup",
    isNew: true,
    views: 96,
    postedAt: "2026-10-15",
    images: [I.blockB, I.emptyRoom, I.minimalCorner, I.sofaSimple],
    headline: "Apartament cu 1 cameră în variantă albă — Botanica, aproape de bd. Dacia",
    description:
      "Apartament cu o cameră, 42 m², la etajul 3 din 9, într-un bloc nou finalizat. Livrat în variantă albă, cu pereți tencuiți, șapă și instalații trase, gata pentru reparația după gustul tău. O alegere bună atât pentru locuit, cât și pentru închiriere.",
    features: [
      "variantă albă, finisaje de bază",
      "încălzire autonomă",
      "geamuri termopan",
      "ascensor",
      "bucătărie separată",
    ],
    nearby: ["Transport public", "Supermarket", "Școală", "Grădiniță", "Parcul Valea Trandafirilor"],
    facilities: residentialFacilities(400, 300, 100),
    coords: [46.9915, 28.8592],
    agent: "mihai",
  },
  {
    id: "100103",
    slug: "100103-apartament-2-camere-centru",
    category: "apartamente",
    transaction: "vanzare",
    title: "Centru, str. Mihai Eminescu — 2 camere, design individual, în inima orașului",
    sector: "Centru",
    street: "str. Mihai Eminescu",
    city: "Chișinău",
    price: 98500,
    area: 68,
    rooms: 2,
    baths: 1,
    floor: 4,
    floors: 5,
    housing: "Fond secundar",
    condition: "Design individual",
    heating: true,
    views: 341,
    postedAt: "2026-10-11",
    images: [I.livingBlue, I.armchair, I.bedroomClassic, I.kitchen, I.livingCognac],
    headline: "Apartament cu 2 camere și design individual — Centru, la doi pași de parc",
    description:
      "Apartament cu 2 camere separate, 68 m², etajul 4 din 5, într-o clădire liniștită din centrul orașului. Reparație cu design individual, materiale de calitate și mobilier la comandă. Ferestrele dau spre curtea interioară, deci e liniște și seara.",
    features: [
      "design individual, materiale premium",
      "încălzire autonomă",
      "mobilier la comandă inclus",
      "tavane înalte",
      "curte interioară liniștită",
    ],
    nearby: ["Parcul Catedralei", "Restaurante", "Universități", "Teatre", "Transport public"],
    facilities: residentialFacilities(600, 500, 150),
    coords: [47.0245, 28.8348],
    agent: "ana",
  },
  {
    id: "100104",
    slug: "100104-apartament-2-camere-living-rascani",
    category: "apartamente",
    transaction: "vanzare",
    title: "Bloc nou, Râșcani, str. Kiev — 2 camere + living, euroreparație, terasă",
    sector: "Râșcani",
    street: "str. Kiev",
    city: "Chișinău",
    price: 89900,
    area: 76,
    rooms: 2,
    living: true,
    baths: 2,
    floor: 6,
    floors: 12,
    housing: "Bloc nou",
    condition: "Euroreparație",
    heating: true,
    builder: "Basconslux",
    isNew: true,
    views: 158,
    postedAt: "2026-10-18",
    images: [I.livingGrey, I.livingOpen, I.livingWhite, I.bedroomWhite, I.kitchen],
    headline: "Apartament 2 camere + living cu terasă — Râșcani, bloc nou",
    description:
      "Apartament luminos de 76 m², la etajul 6 din 12, cu living spațios deschis spre bucătărie și o terasă de 9 m². Euroreparație proaspătă, două băi și dressing. Blocul are parcare subterană și curte amenajată.",
    features: [
      "euroreparație nouă",
      "terasă de 9 m²",
      "2 blocuri sanitare",
      "dressing",
      "parcare subterană",
    ],
    nearby: ["Parcul La Izvor", "Supermarket", "Școală", "Grădiniță", "Transport public"],
    facilities: residentialFacilities(300, 250, 200),
    coords: [47.0512, 28.8601],
    agent: "mihai",
  },
  {
    id: "100105",
    slug: "100105-penthouse-4-camere-telecentru",
    category: "apartamente",
    transaction: "vanzare",
    title: "Penthouse, Telecentru, str. Miorița — 4 camere, 135 m², terasă panoramică",
    sector: "Telecentru",
    street: "str. Miorița",
    city: "Chișinău",
    price: 245000,
    area: 135,
    rooms: 4,
    baths: 3,
    floor: 9,
    floors: 9,
    housing: "Bloc nou",
    condition: "Design individual",
    heating: true,
    builder: "Dragon Grup",
    exclusive: true,
    views: 402,
    postedAt: "2026-10-08",
    images: [I.livingLoft, I.livingPlants, I.stairs, I.bedroomDark, I.dining, I.kitchen],
    headline: "Penthouse de 135 m² cu terasă panoramică — Telecentru, lângă pădurea Râșcani",
    description:
      "Penthouse pe ultimul etaj, cu 4 camere, 3 băi și o terasă panoramică spre parc. Design individual semnat de un studio local, finisaje premium și sistem smart home. O locuință rară pe piață, potrivită pentru o familie care vrea spațiu și liniște aproape de centru.",
    features: [
      "ultimul etaj, priveliște deschisă",
      "terasă panoramică",
      "sistem smart home",
      "3 blocuri sanitare",
      "2 locuri de parcare incluse",
      "încălzire autonomă + pardoseală caldă",
    ],
    nearby: ["Parcul Valea Morilor", "Școală", "Grădiniță", "Supermarket", "Clinică medicală"],
    facilities: residentialFacilities(500, 400, 300),
    coords: [47.0083, 28.8126],
    agent: "ana",
  },
  {
    id: "100106",
    slug: "100106-apartament-2-camere-chirie-centru",
    category: "apartamente",
    transaction: "chirie",
    title: "Chirie, Centru, bd. Ștefan cel Mare — 2 camere, mobilat complet",
    sector: "Centru",
    street: "bd. Ștefan cel Mare",
    city: "Chișinău",
    price: 650,
    area: 64,
    rooms: 2,
    baths: 1,
    floor: 5,
    floors: 9,
    housing: "Fond secundar",
    condition: "Euroreparație",
    heating: false,
    views: 128,
    postedAt: "2026-10-19",
    images: [I.livingCognac, I.sofaSimple, I.bedroomClassic, I.kitchen],
    headline: "Apartament cu 2 camere de închiriat — bd. Ștefan cel Mare, mobilat și utilat",
    description:
      "Apartament cu 2 camere, 64 m², mobilat complet și utilat cu toată tehnica necesară. Pe bulevardul central, cu acces rapid la transport, birouri și restaurante. Contract pe minim 12 luni.",
    features: [
      "mobilat și utilat complet",
      "aer condiționat",
      "mașină de spălat vase",
      "internet și TV",
      "contract minim 12 luni",
    ],
    nearby: ["Transport public", "Restaurante", "Birouri", "Supermarket", "Parc"],
    facilities: residentialFacilities(700, 500, 100),
    coords: [47.0201, 28.8312],
    agent: "mihai",
  },
  {
    id: "100107",
    slug: "100107-apartament-1-camera-living-ciocana",
    category: "apartamente",
    transaction: "vanzare",
    title: "Bloc nou, Ciocana, str. Mircea cel Bătrân — 1 cameră + living, variantă sură",
    sector: "Ciocana",
    street: "str. Mircea cel Bătrân",
    city: "Chișinău",
    price: 46300,
    area: 48,
    rooms: 1,
    living: true,
    baths: 1,
    floor: 2,
    floors: 10,
    housing: "Bloc nou",
    condition: "Variantă sură",
    heating: true,
    builder: "Lagmar",
    isNew: true,
    views: 73,
    postedAt: "2026-10-12",
    images: [I.blockB, I.emptyRoom, I.minimalCorner],
    headline: "1 cameră + living în variantă sură — Ciocana, preț bun pe m²",
    description:
      "Apartament de 48 m² cu o cameră și living, la etajul 2 din 10, într-un bloc nou în construcție avansată. Livrat în variantă sură, cu posibilitatea de a-ți face compartimentarea dorită. Prețul pe metru pătrat e printre cele mai bune din zonă.",
    features: ["variantă sură", "încălzire autonomă", "ascensor", "termen de dare în exploatare: T2 2027"],
    nearby: ["Transport public", "Supermarket", "Școală", "Grădiniță"],
    facilities: residentialFacilities(350, 300, 200),
    coords: [47.0415, 28.8902],
    agent: "mihai",
  },
  {
    id: "200201",
    slug: "200201-casa-4-camere-durlesti",
    category: "case",
    transaction: "vanzare",
    title: "Casă cu 2 niveluri, Durlești — 4 camere, 180 m², teren 6 ari",
    sector: "Durlești",
    street: "str. Cartușa",
    city: "Chișinău",
    price: 225000,
    area: 180,
    rooms: 4,
    baths: 2,
    floors: 2,
    landArea: 6,
    condition: "Euroreparație",
    heating: true,
    exclusive: true,
    views: 189,
    postedAt: "2026-10-14",
    images: [I.houseNight, I.houseCountry, I.dining, I.livingPlants, I.bedroomClassic],
    headline: "Casă de 180 m² pe 6 ari — Durlești, la 10 minute de centru",
    description:
      "Casă pe două niveluri, construită în 2021, cu 4 dormitoare, living cu șemineu, 2 băi și garaj. Curte amenajată cu gazon, foișor și sistem de irigare. Toate comunicațiile sunt conectate: apă, canalizare, gaz și energie electrică.",
    features: [
      "construcție 2021, bloc ceramic",
      "living cu șemineu",
      "garaj pentru o mașină",
      "foișor și curte amenajată",
      "toate comunicațiile conectate",
    ],
    nearby: ["Școală", "Grădiniță", "Supermarket", "Transport public", "Pădure"],
    facilities: residentialFacilities(800, 600, 400),
    coords: [47.0221, 28.7612],
    agent: "ana",
  },
  {
    id: "200202",
    slug: "200202-vila-piscina-stauceni",
    category: "case",
    transaction: "vanzare",
    title: "Vilă modernă cu piscină, Stăuceni — 5 camere, 320 m², teren 10 ari",
    sector: "Stăuceni",
    street: "str. Livezilor",
    city: "Chișinău",
    price: 590000,
    area: 320,
    rooms: 5,
    baths: 4,
    floors: 2,
    landArea: 10,
    condition: "Design individual",
    heating: true,
    exclusive: true,
    views: 512,
    postedAt: "2026-10-05",
    images: [I.villaPool, I.villaPoolB, I.villaPoolC, I.livingLoft, I.livingGrey],
    headline: "Vilă de 320 m² cu piscină și grădină — Stăuceni",
    description:
      "Vilă contemporană cu 5 dormitoare, 4 băi, living dublu ca înălțime și bucătărie deschisă spre terasă. Piscină exterioară încălzită, grădină peisagistică și garaj pentru două mașini. Finisaje premium și sistem smart home.",
    features: [
      "piscină exterioară încălzită",
      "living dublu ca înălțime",
      "garaj pentru 2 mașini",
      "sistem smart home și pompă de căldură",
      "grădină peisagistică cu irigare",
    ],
    nearby: ["Școală", "Supermarket", "Pădure", "Lac"],
    facilities: residentialFacilities(1200, 900, 700),
    coords: [47.0921, 28.8694],
    agent: "mihai",
  },
  {
    id: "300301",
    slug: "300301-duplex-4-camere-telecentru",
    category: "duplexuri",
    transaction: "vanzare",
    title: "Duplex în orășelul nou, Telecentru — 4 camere, 160 m², teren 3 ari",
    sector: "Telecentru",
    street: "str. Pietrarilor",
    city: "Chișinău",
    price: 179000,
    area: 160,
    rooms: 4,
    baths: 3,
    floors: 2,
    landArea: 3,
    condition: "Variantă albă",
    heating: true,
    builder: "Ascon Grup",
    isNew: true,
    views: 144,
    postedAt: "2026-10-16",
    images: [I.duplexWood, I.duplexConcrete, I.stairs, I.bedroomWhite],
    headline: "Duplex de 160 m² în variantă albă — Telecentru, orășel nou",
    description:
      "Duplex pe două niveluri, într-un orășel rezidențial nou și închis. Parter cu living, bucătărie și baie; etaj cu 3 dormitoare și 2 băi. Livrat în variantă albă, cu curte proprie de 3 ari și loc de parcare.",
    features: [
      "orășel închis, cu pază",
      "curte proprie de 3 ari",
      "variantă albă",
      "încălzire autonomă",
      "loc de parcare propriu",
    ],
    nearby: ["Școală", "Grădiniță", "Supermarket", "Parc"],
    facilities: residentialFacilities(600, 300, 300),
    coords: [46.9985, 28.8023],
    agent: "ana",
  },
  {
    id: "300302",
    slug: "300302-duplex-3-camere-codru",
    category: "duplexuri",
    transaction: "vanzare",
    title: "Duplex, Codru — 3 camere, 140 m², euroreparație, terasă acoperită",
    sector: "Codru",
    street: "str. Costiujeni",
    city: "Chișinău",
    price: 149000,
    area: 140,
    rooms: 3,
    baths: 2,
    floors: 2,
    landArea: 2.5,
    condition: "Euroreparație",
    heating: true,
    views: 88,
    postedAt: "2026-10-09",
    images: [I.duplexStone, I.porch, I.livingPlants],
    headline: "Duplex de 140 m² gata de mutare — Codru",
    description:
      "Duplex cu 3 dormitoare, living și bucătărie, terasă acoperită și curte de 2,5 ari. Reparație nouă, mobilier parțial inclus. Zonă liniștită, cu acces rapid spre centru pe str. Grenoble.",
    features: ["euroreparație", "terasă acoperită", "mobilier parțial inclus", "încălzire autonomă"],
    nearby: ["Școală", "Grădiniță", "Supermarket", "Transport public"],
    facilities: residentialFacilities(700, 500, 400),
    coords: [46.9792, 28.7985],
    agent: "mihai",
  },
  {
    id: "400401",
    slug: "400401-spatiu-oficiu-centru",
    category: "spatii-comerciale",
    transaction: "chirie",
    title: "Spațiu pentru oficiu, Centru, str. Vasile Alecsandri — 220 m², open space",
    sector: "Centru",
    street: "str. Vasile Alecsandri",
    city: "Chișinău",
    price: 3200,
    area: 220,
    baths: 2,
    floor: 1,
    floors: 6,
    condition: "Euroreparație",
    heating: true,
    purpose: "Oficiu",
    exclusive: true,
    views: 167,
    postedAt: "2026-10-13",
    images: [I.officeLoft, I.officeOpen, I.lounge],
    headline: "Oficiu open space de 220 m² — Centru, clădire de clasa B+",
    description:
      "Spațiu de oficiu în open space cu două săli de ședințe, bucătărie și 2 grupuri sanitare. Ferestre panoramice, sistem de climatizare și acces 24/7. Parcare pentru angajați în curtea clădirii.",
    features: [
      "open space + 2 săli de ședințe",
      "climatizare și ventilare",
      "acces 24/7, pază",
      "parcare în curte",
    ],
    nearby: ["Transport public", "Restaurante", "Bănci", "Instituții publice"],
    facilities: [
      { name: "Parcare", distance: 20 },
      { name: "Transport public", distance: 100 },
      { name: "Restaurante", distance: 150 },
      { name: "Bancă", distance: 200 },
    ],
    coords: [47.0268, 28.8265],
    agent: "elena",
  },
  {
    id: "400402",
    slug: "400402-spatiu-comercial-botanica",
    category: "spatii-comerciale",
    transaction: "vanzare",
    title: "Spațiu comercial la parter, Botanica, bd. Dacia — 95 m², linia întâi",
    sector: "Botanica",
    street: "bd. Dacia",
    city: "Chișinău",
    price: 189000,
    area: 95,
    baths: 1,
    floor: 0,
    floors: 9,
    condition: "Euroreparație",
    heating: true,
    purpose: "Comercial",
    views: 102,
    postedAt: "2026-10-10",
    images: [I.shop, I.officeOpen],
    headline: "Spațiu comercial de 95 m² pe linia întâi — bd. Dacia",
    description:
      "Spațiu comercial la parterul unui bloc locativ, cu intrare separată din bulevard și vitrine mari. Flux pietonal ridicat, potrivit pentru magazin, farmacie, cafenea sau showroom.",
    features: ["intrare separată", "vitrine pe linia întâi", "flux pietonal ridicat", "încălzire autonomă"],
    nearby: ["Transport public", "Centru comercial", "Bănci", "Parcare publică"],
    facilities: [
      { name: "Parcare", distance: 30 },
      { name: "Transport public", distance: 50 },
      { name: "Centru comercial", distance: 400 },
    ],
    coords: [46.9862, 28.8571],
    agent: "elena",
  },
  {
    id: "500501",
    slug: "500501-teren-constructii-durlesti",
    category: "terenuri",
    transaction: "vanzare",
    title: "Teren pentru construcții, Durlești — 8 ari, comunicații la hotar",
    sector: "Durlești",
    street: "str. Nicolae Testemițanu",
    city: "Chișinău",
    price: 64000,
    area: 8,
    purpose: "Construcții",
    utilities: "Apă, gaz, electricitate la hotar",
    views: 61,
    postedAt: "2026-10-07",
    images: [I.field, I.farm],
    headline: "Teren de 8 ari pentru construcția unei case — Durlești",
    description:
      "Teren plan de 8 ari, cu destinație pentru construcții, într-o zonă rezidențială în dezvoltare. Comunicațiile sunt la hotar, iar accesul se face pe drum asfaltat. Acte în regulă, gata de tranzacție.",
    features: ["teren plan", "acces pe drum asfaltat", "comunicații la hotar", "acte în regulă"],
    nearby: ["Școală", "Supermarket", "Transport public"],
    facilities: [
      { name: "Școală", distance: 900 },
      { name: "Supermarket", distance: 600 },
      { name: "Transport public", distance: 300 },
    ],
    coords: [47.0279, 28.7524],
    agent: "ana",
  },
  {
    id: "500502",
    slug: "500502-teren-colonita",
    category: "terenuri",
    transaction: "vanzare",
    title: "Teren cu priveliște, Colonița — 15 ari, ideal pentru o vilă",
    sector: "Colonița",
    street: "str. Ion Creangă",
    city: "Chișinău",
    price: 45000,
    area: 15,
    purpose: "Construcții",
    utilities: "Electricitate la hotar, gaz în apropiere",
    views: 39,
    postedAt: "2026-10-03",
    images: [I.farm, I.field],
    headline: "Teren de 15 ari cu priveliște spre vale — Colonița",
    description:
      "Teren de 15 ari pe o pantă ușoară, cu priveliște deschisă spre vale, la 15 minute de Chișinău. Potrivit pentru o vilă sau un mic complex de case de vacanță.",
    features: ["priveliște deschisă", "pantă ușoară", "electricitate la hotar", "zonă liniștită"],
    nearby: ["Transport public", "Magazin", "Pădure"],
    facilities: [
      { name: "Magazin", distance: 500 },
      { name: "Transport public", distance: 400 },
    ],
    coords: [47.0386, 28.9417],
    agent: "mihai",
  },
];

/* ── Helpers ───────────────────────────────────────────── */

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const categoryOf = (key: CategoryKey) => categories.find((c) => c.key === key)!;

/** 97300 → "97 300" (spații neîntrerupte, identic pe server și client) */
export const formatNumber = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 1 }).replace(/,/g, " ").replace(".", ",");

export const formatPrice = (p: Property) =>
  `${formatNumber(p.price)} €${p.transaction === "chirie" ? " / lună" : ""}`;

export const areaUnit = (p: Property) => (p.category === "terenuri" ? "ari" : "m²");

export const pricePerUnit = (p: Property) =>
  `${formatNumber(Math.round(p.price / p.area))} € / ${p.category === "terenuri" ? "ar" : "m²"}`;

/** Rată lunară estimativă: avans 30%, 20 de ani, dobândă 7,8% / an. */
export const mortgage = (p: Property) => {
  if (p.transaction !== "vanzare" || p.category === "terenuri") return null;
  const loan = p.price * 0.7;
  const r = 0.078 / 12;
  const n = 240;
  return Math.round((loan * r) / (1 - Math.pow(1 + r, -n)));
};

export const roomsLabel = (p: Property) => {
  if (!p.rooms) return null;
  const base = p.rooms === 1 ? "1 cameră" : `${p.rooms} camere`;
  return p.living ? `${base} + living` : base;
};

export const floorLabel = (p: Property) => {
  if (p.floor === undefined) return null;
  const f = p.floor === 0 ? "Parter" : `${p.floor}`;
  return p.floors ? `${f}/${p.floors} etaje` : f;
};

export const bathsLabel = (p: Property) => (p.baths ? (p.baths === 1 ? "1 baie" : `${p.baths} băi`) : null);

/** Rândul scurt de pe card: „2 camere · 72 m² · 4/9 etaje · 2 băi” */
export const cardSpecs = (p: Property) => {
  const area = `${formatNumber(p.area)} ${areaUnit(p)}`;
  switch (p.category) {
    case "apartamente":
      return [roomsLabel(p), area, floorLabel(p), bathsLabel(p)];
    case "case":
    case "duplexuri":
      return [roomsLabel(p), area, p.landArea ? `teren ${formatNumber(p.landArea)} ari` : null, bathsLabel(p)];
    case "spatii-comerciale":
      return [p.purpose, area, floorLabel(p)];
    case "terenuri":
      return [area, p.purpose ? `pentru ${p.purpose.toLowerCase()}` : null];
  }
};

/** Toate criteriile, pentru pagina proprietății. */
export const detailSpecs = (p: Property) => {
  const rows: [string, string | null | undefined][] = [
    ["Locație", p.sector],
    ["Tranzacție", p.transaction === "vanzare" ? "Vânzare" : "Chirie"],
    ["Nr. camere", roomsLabel(p)],
    ["Fond locativ", p.housing],
    ["Stare imobil", p.condition],
    ["Suprafața", `${formatNumber(p.area)} ${areaUnit(p)}`],
    ["Suprafața terenului", p.landArea ? `${formatNumber(p.landArea)} ari` : null],
    [p.category === "case" || p.category === "duplexuri" ? "Nr. niveluri" : "Nivel", p.category === "case" || p.category === "duplexuri" ? (p.floors ? `${p.floors}` : null) : floorLabel(p)],
    ["Nr. băi", bathsLabel(p)],
    ["Încălzire autonomă", p.heating === undefined ? null : p.heating ? "Da" : "Nu"],
    ["Comp. de construcții", p.builder],
    ["Destinație", p.purpose],
    ["Comunicații", p.utilities],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
};
