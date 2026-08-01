import type { DishContent } from "./types";

/**
 * The 11 mockup dishes feeding the `/menu` grid, in mockup order with their
 * placeholder frame tints (`t-jade` / `t-gold` / `t-emerald`; gold is the
 * champagne recipe). `zhName` is the bilingual design field shown on both
 * locales; `line` carries the drafted zh-Hant description, pending native
 * review.
 */
export const dishes: DishContent[] = [
  {
    id: "crystal-har-gow",
    name: "Crystal Har Gow",
    zhName: "水晶蝦餃",
    line: {
      en: "Hand-pleated shrimp dumplings, bamboo shoot, translucent skin.",
      zh: "手工摺褶鮮蝦餃，筍粒，皮薄晶瑩。",
    },
    category: "dimsum",
    order: 1,
    frame: { tint: "jade" },
  },
  {
    id: "char-siu-sou",
    name: "Char Siu Sou",
    zhName: "蜜汁叉燒酥",
    line: {
      en: "Flaky baked pastry, honeyed barbecue pork.",
      zh: "酥皮鬆化，蜜汁叉燒。",
    },
    category: "dimsum",
    order: 2,
    frame: { tint: "champagne" },
  },
  {
    id: "steamed-siu-mai",
    name: "Steamed Siu Mai",
    zhName: "魚子燒賣",
    line: {
      en: "Pork and prawn, crowned with flying fish roe.",
      zh: "豬肉鮮蝦，綴以飛魚籽。",
    },
    category: "dimsum",
    order: 3,
    frame: { tint: "emerald" },
  },
  {
    id: "signature-crispy-roast-duck",
    name: "Signature Crispy Roast Duck",
    zhName: "招牌脆皮燒鴨",
    line: {
      en: "Lacquered skin, carved to order.",
      zh: "脆皮如漆，即點即片。",
    },
    category: "roast",
    order: 4,
    frame: { tint: "champagne" },
  },
  {
    id: "crispy-pork-belly",
    name: "Crispy Pork Belly",
    zhName: "化皮燒腩仔",
    line: {
      en: "Glass-crisp crackling, five-spice salt.",
      zh: "脆皮如玻璃，佐五香鹽。",
    },
    category: "roast",
    order: 5,
    frame: { tint: "jade" },
  },
  {
    id: "wok-seared-lobster",
    name: "Wok-Seared Lobster",
    zhName: "薑蔥焗龍蝦",
    line: {
      en: "Ginger and scallion, superior stock.",
      zh: "薑蔥爆香，上湯提鮮。",
    },
    category: "seafood",
    order: 6,
    frame: { tint: "emerald" },
  },
  {
    id: "steamed-catch-of-the-day",
    name: "Steamed Catch of the Day",
    zhName: "清蒸游水海魚",
    line: {
      en: "Whole fish, aged soy, hot oil finish.",
      zh: "原條清蒸，陳年豉油，滾油淋香。",
    },
    category: "seafood",
    order: 7,
    frame: { tint: "jade" },
  },
  {
    id: "braised-abalone-sea-cucumber",
    name: "Braised Abalone & Sea Cucumber",
    zhName: "鮑魚扣遼參",
    line: {
      en: "Ten-hour master stock, seasonal greens.",
      zh: "十小時老滷慢煨，配時令青蔬。",
    },
    category: "mains",
    order: 8,
    frame: { tint: "champagne" },
  },
  {
    id: "wok-fried-beef-tenderloin",
    name: "Wok-Fried Beef Tenderloin",
    zhName: "中式牛柳",
    line: {
      en: "Cantonese style, caramelized shallot.",
      zh: "粵式做法，焦香乾蔥。",
    },
    category: "mains",
    order: 9,
    frame: { tint: "emerald" },
  },
  {
    id: "chilled-mango-sago-pomelo",
    name: "Chilled Mango Sago Pomelo",
    zhName: "楊枝甘露",
    line: {
      en: "A Crystal Jade classic, finished with fresh cream.",
      zh: "Crystal Jade 經典之作，鮮忌廉收結。",
    },
    category: "desserts",
    order: 10,
    frame: { tint: "jade" },
  },
  {
    id: "double-boiled-almond-cream",
    name: "Double-Boiled Almond Cream",
    zhName: "生磨杏仁茶",
    line: {
      en: "Stone-ground, served warm.",
      zh: "石磨細研，暖飲上桌。",
    },
    category: "desserts",
    order: 11,
    frame: { tint: "champagne" },
  },
];

/** The landing Signature Dishes trio, in landing order. */
export const signatureDishIds = [
  "signature-crispy-roast-duck",
  "wok-seared-lobster",
  "crystal-har-gow",
] as const;

export const signatureDishes: DishContent[] = signatureDishIds
  .map((id) => dishes.find((dish) => dish.id === id))
  .filter((dish): dish is DishContent => dish !== undefined);
