import type { DishCategory } from "@/types";

/**
 * The typed chrome dictionary (CLAUDE.md, Localization). Every interface
 * string that is not editor-managed content lives here per locale: nav aria
 * labels, buttons, section heads, pending-frame labels, and meta strings.
 * Server Components read it through their `locale` prop via `getStrings`;
 * client leaves receive resolved strings as props and never import this
 * module (props-over-import). Content prose lives in `lib/content/`, not
 * here.
 *
 * The zh values are drafted Traditional Chinese in a Hong Kong fine dining
 * register, pending native review (tracked in docs/zh-review.md once Z3
 * lands). English placeholder strings stay placeholders in zh.
 */

export type Locale = "en" | "zh";

export const LOCALES: readonly Locale[] = ["en", "zh"];

/** BCP 47 tag per locale, for `html lang` and hreflang pairs. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hant",
};

/**
 * Locale-prefixed internal href: zh routes live under /zh, en at the root.
 * External URLs and fragment anchors pass through untouched.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en" || !path.startsWith("/")) return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

/** Pending-frame label set (PhotoFrame kicker / name, optional tag). */
export type FrameStrings = {
  kicker: string;
  name: string;
  tag?: string;
};

/** Strings for the client-side menu grid (chips, cards), passed as props. */
export type MenuGridStrings = {
  allDishes: string;
  categories: Record<DishCategory, string>;
  photoKicker: string;
};

/** Strings for the client-side header and mobile menu, passed as props. */
export type HeaderStrings = {
  navAria: string;
  openMenu: string;
  closeMenu: string;
  menuAria: string;
  bookATable: string;
};

export type SiteStrings = {
  chrome: {
    skipToContent: string;
    header: HeaderStrings;
    detailsAria: string;
    daily: string;
    wechat: string;
    bookATable: string;
  };
  home: {
    heroEyebrow: string;
    heroFrame: FrameStrings;
    heroScrollAria: string;
    trioEyebrow: string;
    trioTitle: string;
    trioPhotoKicker: string;
    viewFullMenu: string;
    privateEyebrow: string;
    privateTitle: string;
    privateFrame: FrameStrings;
    banquetCta: string;
  };
  story: {
    bandEyebrow: string;
    bandTitle: string;
    bandFrame: FrameStrings;
    heritageEyebrow: string;
    heritageTitle: string;
    heritageFrame: FrameStrings;
    richmondEyebrow: string;
    richmondTitle: string;
    richmondFrame: FrameStrings;
    philosophyEyebrow: string;
    philosophyTitle: string;
    conceptKicker: string;
  };
  chef: {
    eyebrow: string;
    portraitFrame: FrameStrings;
    hisStory: string;
    notableMoments: string;
    emblemNote: string;
    quoteCite: string;
  };
  menu: {
    bandEyebrow: string;
    bandTitle: string;
    bandLine: string;
    bandFrame: FrameStrings;
    grid: MenuGridStrings;
    closing: string;
  };
  banquet: {
    bandEyebrow: string;
    bandTitle: string;
    bandLine: string;
    bandFrame: FrameStrings;
    servicesEyebrow: string;
    servicesTitle: string;
    occasionsLabel: string;
    tableFrame: FrameStrings;
    bespokeEyebrow: string;
    bespokeTitle: string;
    enquireNow: string;
    courseFrame: FrameStrings;
  };
  reserve: {
    eyebrow: string;
    title: string;
    telephone: string;
    wechat: string;
    hours: string;
    address: string;
    placeholder: string;
    placeholderDaily: string;
    crosslink: string;
    embedFrame: FrameStrings;
  };
  meta: {
    titleDefault: string;
    titleTemplate: string;
    siteDescription: string;
    story: { title: string; description: string };
    chef: { title: string; description: string };
    menu: { title: string; description: string };
    banquet: { title: string; description: string };
    reserve: { title: string; description: string };
  };
};

const en: SiteStrings = {
  chrome: {
    skipToContent: "Skip to content",
    header: {
      navAria: "Crystal Jade Palace pages",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuAria: "Menu",
      bookATable: "Book a Table",
    },
    detailsAria: "Crystal Jade Palace details",
    daily: ", daily",
    wechat: "WeChat",
    bookATable: "Book a Table",
  },
  home: {
    heroEyebrow: "Cantonese Fine Dining · GreenTee Richmond Center",
    heroFrame: {
      kicker: "Full-screen visual",
      name: "Dining Room · Photo or Video Loop",
      tag: "Replace with restaurant photography or video loop",
    },
    heroScrollAria: "Scroll to introduction",
    trioEyebrow: "Signature Dishes",
    trioTitle: "From the *kitchen*.",
    trioPhotoKicker: "Photo",
    viewFullMenu: "View the Full Menu",
    privateEyebrow: "Private Dining",
    privateTitle: "Rooms for the occasions\nthat *matter*.",
    privateFrame: {
      kicker: "Image placeholder",
      name: "Private Dining Room",
      tag: "Replace with final photography",
    },
    banquetCta: "Banquet & Private Dining",
  },
  story: {
    bandEyebrow: "Our Story",
    bandTitle: "From a single kitchen\nto the world.",
    bandFrame: {
      kicker: "Image placeholder",
      name: "Crystal Jade Brand Imagery",
      tag: "Replace with brand photography per brand guide",
    },
    heritageEyebrow: "Heritage",
    heritageTitle: "Carried across the region's\ngreat *cities*.",
    heritageFrame: {
      kicker: "Map placeholder",
      name: "Global Footprint",
      tag: "Confirm footprint list with Crystal Jade brand guide",
    },
    richmondEyebrow: "Why Richmond, Why Now",
    richmondTitle: "Not an introduction.\nA *homecoming*.",
    richmondFrame: {
      kicker: "Image placeholder",
      name: "Richmond · The Vancouver Chapter",
      tag: "Replace with final photography",
    },
    philosophyEyebrow: "Kitchen Philosophy",
    philosophyTitle: "Three ideas, held *quietly*.",
    conceptKicker: "Concept image",
  },
  chef: {
    eyebrow: "The Chef",
    portraitFrame: {
      kicker: "Portrait placeholder",
      name: "Chef Portrait · Kitchen Setting",
      tag: "Kitchen setting, not a studio headshot",
    },
    hisStory: "His Story",
    notableMoments: "Notable Moments",
    emblemNote: "Emblems are placeholders. Replace with official award assets.",
    quoteCite: "In His Own Words · Placeholder, replace with chef interview",
  },
  menu: {
    bandEyebrow: "The Menu",
    bandTitle: "Signature *dishes*.",
    bandLine: "Dishes that change with the seasons. Technique that does not.",
    bandFrame: {
      kicker: "Full-width banner",
      name: "Signature Dish · Editorial Photography",
      tag: "Replace with final dish photography",
    },
    grid: {
      allDishes: "All Dishes",
      categories: {
        dimsum: "Dim Sum",
        roast: "Roasted Meats",
        seafood: "Seafood",
        mains: "Mains",
        desserts: "Desserts",
      },
      photoKicker: "Large-format photo",
    },
    closing: "Our menu evolves with the seasons and the chef's current inspiration.",
  },
  banquet: {
    bandEyebrow: "Banquet & Private Dining",
    bandTitle: "Rooms for the occasions\nthat *matter*.",
    bandLine: "Private rooms, dedicated service, and menus composed for the table.",
    bandFrame: {
      kicker: "Image placeholder",
      name: "Banquet Hall · Private Dining Room",
      tag: "Replace with final photography",
    },
    servicesEyebrow: "Banquet Services",
    servicesTitle: "Composed around\nthe *table*.",
    occasionsLabel: "Occasions",
    tableFrame: {
      kicker: "Food image",
      name: "Banquet Table",
      tag: "Replace with final photography",
    },
    bespokeEyebrow: "Bespoke Menus",
    bespokeTitle: "Two ways to\n*compose*.",
    enquireNow: "Enquire Now",
    courseFrame: {
      kicker: "Image placeholder",
      name: "Composed Course",
      tag: "Replace with final photography",
    },
  },
  reserve: {
    eyebrow: "Reserve",
    title: "A table *awaits*.",
    telephone: "Telephone",
    wechat: "WeChat",
    hours: "Hours",
    address: "Address",
    placeholder: "Placeholder",
    placeholderDaily: "Placeholder, daily",
    crosslink: "Planning a private event? Banquet & Private Dining",
    embedFrame: {
      kicker: "OpenTable embed placeholder",
      name: "Online Reservations",
    },
  },
  meta: {
    titleDefault: "Crystal Jade Palace",
    titleTemplate: "%s · Crystal Jade Palace",
    siteDescription:
      "Cantonese fine dining at GreenTee Richmond Center. The first Crystal Jade Palace in North America, led by a Michelin-starred kitchen.",
    story: {
      title: "Our Story",
      description:
        "From a single Cantonese kitchen to one of Asia's most respected names in fine dining, now arriving in Richmond.",
    },
    chef: {
      title: "The Chef",
      description:
        "A Michelin-starred kitchen led by twenty-three years across five-star kitchens, from China to Vancouver.",
    },
    menu: {
      title: "Menu",
      description:
        "Signature Cantonese dishes across dim sum, roasted meats, seafood, mains, and desserts, changing with the seasons.",
    },
    banquet: {
      title: "Banquet",
      description:
        "Private rooms, dedicated service, and bespoke banquet menus composed for the table.",
    },
    reserve: {
      title: "Reserve",
      description:
        "Book a table at Crystal Jade Palace by telephone, WeChat, or online, for lunch and dinner daily.",
    },
  },
};

const zh: SiteStrings = {
  chrome: {
    skipToContent: "跳至內容",
    header: {
      navAria: "Crystal Jade Palace 頁面",
      openMenu: "開啟選單",
      closeMenu: "關閉選單",
      menuAria: "選單",
      bookATable: "訂座",
    },
    detailsAria: "餐廳資訊",
    daily: "，每日供應",
    wechat: "微信",
    bookATable: "訂座",
  },
  home: {
    heroEyebrow: "高級粵菜 · GreenTee Richmond Center",
    heroFrame: {
      kicker: "全幅畫面",
      name: "餐廳空間 · 照片或影片",
      tag: "待餐廳攝影或影片完成後替換",
    },
    heroScrollAria: "捲動至簡介",
    trioEyebrow: "招牌菜式",
    trioTitle: "自*廚房*而來。",
    trioPhotoKicker: "照片",
    viewFullMenu: "瀏覽全份菜單",
    privateEyebrow: "私人宴請",
    privateTitle: "為重要時刻\n而設的*廳房*。",
    privateFrame: {
      kicker: "圖片預留位",
      name: "私人宴會廳",
      tag: "待正式攝影完成後替換",
    },
    banquetCta: "宴會及私人宴請",
  },
  story: {
    bandEyebrow: "我們的故事",
    bandTitle: "由一間廚房\n走向世界。",
    bandFrame: {
      kicker: "圖片預留位",
      name: "Crystal Jade 品牌影像",
      tag: "待依品牌指引替換品牌攝影",
    },
    heritageEyebrow: "傳承",
    heritageTitle: "走遍區內\n各大*名城*。",
    heritageFrame: {
      kicker: "地圖預留位",
      name: "全球據點",
      tag: "據點名單待品牌指引確認",
    },
    richmondEyebrow: "為何列治文，為何此刻",
    richmondTitle: "不是初來乍到，\n而是*歸來*。",
    richmondFrame: {
      kicker: "圖片預留位",
      name: "列治文 · 溫哥華篇章",
      tag: "待正式攝影完成後替換",
    },
    philosophyEyebrow: "廚房哲學",
    philosophyTitle: "三個信念，*靜靜*持守。",
    conceptKicker: "概念圖片",
  },
  chef: {
    eyebrow: "主廚",
    portraitFrame: {
      kicker: "肖像預留位",
      name: "主廚肖像 · 廚房實景",
      tag: "廚房實景，非影樓照",
    },
    hisStory: "他的故事",
    notableMoments: "重要時刻",
    emblemNote: "徽章為暫代圖樣，待官方獎項素材替換。",
    quoteCite: "主廚自述 · 暫代文字，待主廚訪問後替換",
  },
  menu: {
    bandEyebrow: "菜單",
    bandTitle: "招牌*菜式*。",
    bandLine: "菜式隨四季更替，功夫始終如一。",
    bandFrame: {
      kicker: "全幅橫額",
      name: "招牌菜式 · 編輯級攝影",
      tag: "待正式菜式攝影完成後替換",
    },
    grid: {
      allDishes: "全部菜式",
      categories: {
        dimsum: "點心",
        roast: "燒味",
        seafood: "海鮮",
        mains: "主菜",
        desserts: "甜品",
      },
      photoKicker: "大幅照片",
    },
    closing: "菜單隨四季與主廚當下的靈感而變。",
  },
  banquet: {
    bandEyebrow: "宴會及私人宴請",
    bandTitle: "為重要時刻\n而設的*廳房*。",
    bandLine: "私人廳房、專屬服務，以及為整席而設的菜單。",
    bandFrame: {
      kicker: "圖片預留位",
      name: "宴會廳 · 私人廳房",
      tag: "待正式攝影完成後替換",
    },
    servicesEyebrow: "宴會服務",
    servicesTitle: "圍繞*一席*\n悉心編排。",
    occasionsLabel: "場合",
    tableFrame: {
      kicker: "菜式圖片",
      name: "宴會餐桌",
      tag: "待正式攝影完成後替換",
    },
    bespokeEyebrow: "度身菜單",
    bespokeTitle: "兩種*編排*\n之道。",
    enquireNow: "立即查詢",
    courseFrame: {
      kicker: "圖片預留位",
      name: "擺盤菜式",
      tag: "待正式攝影完成後替換",
    },
  },
  reserve: {
    eyebrow: "訂座",
    title: "為您*留座*。",
    telephone: "電話",
    wechat: "微信",
    hours: "營業時間",
    address: "地址",
    placeholder: "暫代資料",
    placeholderDaily: "暫代資料，每日",
    crosslink: "籌備私人宴會？宴會及私人宴請",
    embedFrame: {
      kicker: "OpenTable 嵌入預留位",
      name: "網上訂座",
    },
  },
  meta: {
    titleDefault: "Crystal Jade Palace",
    titleTemplate: "%s · Crystal Jade Palace",
    siteDescription:
      "GreenTee Richmond Center 內的高級粵菜食府。Crystal Jade Palace 首度落戶北美，由米芝蓮星級廚房主理。",
    story: {
      title: "我們的故事",
      description:
        "由一間粵菜廚房，成為亞洲最受尊崇的高級餐飲名字之一，此刻來到列治文。",
    },
    chef: {
      title: "主廚",
      description:
        "米芝蓮星級廚房，主廚歷經二十三年五星級廚房歷練，從中國到溫哥華。",
    },
    menu: {
      title: "菜單",
      description: "招牌粵菜遍及點心、燒味、海鮮、主菜與甜品，隨四季更替。",
    },
    banquet: {
      title: "宴會",
      description: "私人廳房、專屬服務，以及為整席悉心編排的宴會菜單。",
    },
    reserve: {
      title: "訂座",
      description:
        "歡迎致電、微信或網上預訂 Crystal Jade Palace 餐桌，午市晚市每日供應。",
    },
  },
};

const STRINGS: Record<Locale, SiteStrings> = { en, zh };

/** The chrome dictionary for a locale; call in Server Components only. */
export function getStrings(locale: Locale): SiteStrings {
  return STRINGS[locale];
}
