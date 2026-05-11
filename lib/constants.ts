export const SITE = {
  name: "Sina Street Food",
  /** Google Bedriftsprofil — kategori */
  category: "Fast food / pizza / street food",
  /** Prisindikasjon fra Google */
  priceRangeKr: "200–300",
  phoneDisplay: "97 27 27 30",
  phone: "+47 97 27 27 30",
  phoneHref: "tel:+4797272730",
  address: "Bakgården, Kongensgate 57, 8514 Narvik",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Kongensgate+57,+8514+Narvik,+Norway",
  instagram: "https://www.instagram.com/sinastreetfood/",
  instagramHandle: "@sinastreetfood",
  rating: "4.8",
  reviewCount: 38,
  /** Tekst inspirert av Facebook / Google */
  tagline:
    "Vi legger vekt på gode råvarer, smakfulle retter og personlig service – slik at du kan senke skuldrene og nyte selskapet.",
  signature:
    "Vårrullene våre er laget med omtanke og kjærlighet — fordi vi bryr oss om kundene våre.",
  aboutExtra:
    "Vi er en del av go2grill-familien og holder til i kjelleren på Kongensgate — lokal street food med finesse.",
} as const;

/** Ukentlige tider (Google Bedriftsprofil, Mai 2026). Mandag stengt. */
export const OPENING_WEEK = [
  { day: "Mandag", hours: "Stengt" },
  { day: "Tirsdag", hours: "12:00 – 20:00" },
  { day: "Onsdag", hours: "12:00 – 20:00" },
  { day: "Torsdag", hours: "12:00 – 20:00" },
  { day: "Fredag", hours: "11:00 – 21:00" },
  { day: "Lørdag", hours: "12:00 – 21:00" },
  { day: "Søndag", hours: "12:00 – 21:00" },
] as const;

/** Lokalt bilde: `public/images/hero.png` */
export const IMG = {
  hero: "/images/hero.png",
  burgerCat:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=85&auto=format&fit=crop",
  sushiCat:
    "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=85&auto=format&fit=crop",
  pizzaCat:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=85&auto=format&fit=crop",
  comboCat:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=85&auto=format&fit=crop",
  dealBurger:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=85&auto=format&fit=crop",
  dishBurger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=85&auto=format&fit=crop",
  dishSushi:
    "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=85&auto=format&fit=crop",
  dishPizza:
    "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=85&auto=format&fit=crop",
  dishFries:
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=85&auto=format&fit=crop",
  familyCombo:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&q=85&auto=format&fit=crop",
  ig1:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=85&auto=format&fit=crop",
  ig2:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=85&auto=format&fit=crop",
  ig3:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=85&auto=format&fit=crop",
  ig4:
    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&q=85&auto=format&fit=crop",
} as const;

export const REVIEWS = [
  {
    id: "1",
    name: "Deimante J.",
    when: "for 1 måned siden",
    text: "Fantastisk mat og hyggelig betjening! Beste sushi i Narvik. Anbefales på det sterkeste!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&q=80&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Magnus R.",
    when: "for 2 uker siden",
    text: "Sinnsykt god burger — crispy, saftig og rask levering. Kommer garantert tilbake.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&q=80&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Sara K.",
    when: "for 3 dager siden",
    text: "Familien elsket pizza og fries. Hyggelig crew og fine lokaler. Fem stjerner!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&q=80&auto=format&fit=crop",
  },
] as const;
