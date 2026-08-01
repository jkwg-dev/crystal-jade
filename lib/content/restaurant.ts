import type { RestaurantContent } from "./types";

/**
 * The full Crystal Jade Palace restaurant singleton, feeding all six routes
 * in both locales. English copy ported verbatim from the dining mockups
 * (v6); the phone, WeChat handle, hours, address, room count, and footprint
 * list are placeholders confirmed before launch. The zh values are drafted
 * Traditional Chinese in a Hong Kong fine dining register, pending native
 * review; brand names without confirmed official Chinese names (Crystal
 * Jade Palace, GreenTee Richmond Center, hotel groups keep their standard
 * Chinese names) stay English inside zh copy, and English placeholders stay
 * placeholders in zh.
 */
export const restaurant: RestaurantContent = {
  name: "Crystal Jade Palace",
  tagline: {
    en: "A Michelin dining experience · The first in North America",
    zh: "米芝蓮星級餐飲體驗 · 北美首家",
  },
  lede: {
    en: "Cantonese fine dining on the promenade. The first Crystal Jade Palace in North America, led by a Michelin-starred kitchen.",
    zh: "海濱長廊上的高級粵菜食府。Crystal Jade Palace 首度落戶北美，由米芝蓮星級廚房主理。",
  },
  intro: {
    lede: {
      en: "One of Asia's most respected Cantonese kitchens arrives in Richmond.",
      zh: "亞洲最受尊崇的粵菜廚房之一，來到列治文。",
    },
    support: {
      en: "Classical technique, premium ingredients, and a quiet creativity that never obscures either. Lunch and dinner daily, within GreenTee Richmond Center.",
      zh: "經典功夫、上乘食材，加上一份從不喧賓奪主的靜靜創意。午市晚市每日供應，位於 GreenTee Richmond Center 內。",
    },
  },
  credentials: [
    {
      label: { en: "Michelin", zh: "米芝蓮" },
      value: {
        en: "Vancouver Michelin Star, four consecutive years",
        zh: "溫哥華米芝蓮星級，連續四年",
      },
      detail: { en: "2022 to 2025", zh: "2022 至 2025" },
    },
    {
      label: { en: "Accolades", zh: "殊榮" },
      value: {
        en: "North America's Best Chinese Cuisine Restaurant, 2025",
        zh: "2025 年北美最佳中菜餐廳",
      },
      detail: {
        en: "Supreme Gold, World Championship of Chinese Cuisine 2024",
        zh: "2024 年世界中菜烹飪大賽至尊金獎",
      },
    },
    {
      label: { en: "Private Dining", zh: "私人宴請" },
      value: {
        en: "Private rooms and bespoke banquet menus",
        zh: "私人廳房與度身宴會菜單",
      },
      detail: {
        en: "Corporate dining by arrangement",
        zh: "企業宴請可作安排",
      },
    },
  ],
  privateDining: {
    copy: {
      en: "From board dinners to family celebrations, eight private rooms hold intimate parties and full banquet tables, each with dedicated service and menus composed for the occasion.",
      zh: "由董事局晚宴到家庭喜慶，八間私人廳房可容納小敘至全席筵開，均配專屬服務，菜單為場合悉心編排。",
    },
    facts: [
      {
        label: { en: "Private Rooms", zh: "私人廳房" },
        value: { en: "Eight rooms", zh: "八間廳房" },
        detail: {
          en: "Placeholder, confirm count",
          zh: "暫代資料，房數待確認",
        },
      },
      {
        label: { en: "Capacity", zh: "容納人數" },
        value: {
          en: "From six guests to full banquet tables",
          zh: "六位小敘至全席筵開",
        },
      },
      {
        label: { en: "Booking", zh: "預訂" },
        value: {
          en: "Separate enquiry channel for private events",
          zh: "私人宴會另設查詢渠道",
        },
      },
    ],
  },
  story: {
    heritage: {
      lead: {
        en: "Crystal Jade began with one Cantonese kitchen and grew into one of Asia's most respected names in fine dining.",
        zh: "Crystal Jade 由一間粵菜廚房起步，成長為亞洲最受尊崇的高級餐飲名字之一。",
      },
      body: [
        {
          en: "Across decades and cities, the group has carried the discipline of classical technique wherever it opens a door. The standard travels. The kitchen adapts.",
          zh: "數十年間，足跡遍及各大城市，集團每開一扇門，都帶著經典功夫的嚴謹。標準隨行，廚房因地制宜。",
        },
      ],
    },
    footprint: [
      { en: "Singapore", zh: "新加坡" },
      { en: "Hong Kong", zh: "香港" },
      { en: "Shanghai", zh: "上海" },
      { en: "Across Asia", zh: "遍及亞洲" },
    ],
    footprintNow: { en: "Now, Richmond", zh: "此刻，列治文" },
    richmond: {
      lead: {
        en: "Richmond is home to one of the most discerning Cantonese dining audiences outside Asia.",
        zh: "列治文擁有亞洲以外最懂粵菜的食客群之一。",
      },
      body: [
        {
          en: "Crystal Jade Palace comes here not to introduce the cuisine, but to honor how well this city already knows it.",
          zh: "Crystal Jade Palace 來到這裏，不是為了介紹粵菜，而是向這座早已深諳粵菜的城市致意。",
        },
        {
          en: "The timing is simple. A room worthy of the kitchen became possible at GreenTee Richmond Center, and the kitchen was ready.",
          zh: "時機很簡單。GreenTee Richmond Center 出現了一個配得上這個廚房的空間，而廚房亦已準備好。",
        },
      ],
    },
    philosophy: [
      {
        title: { en: "Classical Technique", zh: "經典功夫" },
        line: {
          en: "Recipes held to the standard of the masters who wrote them. Nothing enters the menu until it survives that comparison.",
          zh: "每道食譜都以寫下它的大師為準繩。未經這重比對，不會登上菜單。",
        },
      },
      {
        title: { en: "Premium Ingredients", zh: "上乘食材" },
        line: {
          en: "Sourcing decides the ceiling of every dish. The kitchen sources accordingly, season by season.",
          zh: "採購決定每道菜的上限。廚房按此嚴選，隨季而行。",
        },
      },
      {
        title: { en: "Quiet Creativity", zh: "靜靜創意" },
        line: {
          en: "New ideas arrive slowly, and only when they deepen the original rather than decorate it.",
          zh: "新意來得緩慢，只在深化原味而非裝點原味時，方才登場。",
        },
      },
    ],
  },
  chef: {
    intro: {
      en: "A journey measured\nin quiet *decades*.",
      zh: "一段以靜靜*數十年*\n丈量的旅途。",
    },
    awards: [
      {
        title: {
          en: "Vancouver Michelin Star",
          zh: "溫哥華米芝蓮星級",
        },
        detail: { en: "Four consecutive years", zh: "連續四年" },
        years: { en: "2022 to 2025", zh: "2022 至 2025" },
      },
      {
        title: {
          en: "World Championship of Chinese Cuisine",
          zh: "世界中菜烹飪大賽",
        },
        detail: {
          en: "Individual Supreme Gold Award",
          zh: "個人至尊金獎",
        },
        years: { en: "2024", zh: "2024" },
      },
      {
        title: {
          en: "North America's Best Chinese Cuisine Restaurant",
          zh: "北美最佳中菜餐廳",
        },
        years: { en: "2025", zh: "2025" },
      },
    ],
    bio: {
      en: "Twenty-three years across five-star kitchens, from Banyan Tree and Marriott to InterContinental and Pan Pacific. A culinary journey that began in China and now settles in Vancouver.",
      zh: "二十三年五星級廚房歷練，由悅榕莊、萬豪到洲際、泛太平洋。廚藝之旅始於中國，如今落戶溫哥華。",
    },
    moments: [
      {
        en: "Host to a Canadian Prime Minister and senators",
        zh: "曾接待加拿大總理及參議員",
      },
      {
        en: "Commended by a State Councilor of China",
        zh: "獲中國國務委員讚許",
      },
      {
        en: "Featured in culinary publications",
        zh: "獲飲食刊物專題報道",
      },
    ],
    quote: {
      en: "Cantonese cuisine rewards patience. My work is to let the ingredient speak first, and to speak second.",
      zh: "粵菜回報耐性。我的本份，是讓食材先說話，自己再說。",
    },
  },
  banquet: {
    copy: {
      en: "Corporate dinners, family celebrations, and ceremonies, held behind a closed door with a team assigned to the room.",
      zh: "企業晚宴、家庭喜慶與典禮，於閉門廳房內進行，並有專責團隊駐房服務。",
    },
    facts: [
      {
        label: { en: "Private Rooms", zh: "私人廳房" },
        value: { en: "Eight rooms", zh: "八間廳房" },
        detail: {
          en: "Placeholder, confirm count",
          zh: "暫代資料，房數待確認",
        },
      },
      {
        label: { en: "Capacity", zh: "容納人數" },
        value: {
          en: "From six guests to full banquet tables",
          zh: "六位小敘至全席筵開",
        },
      },
      {
        label: { en: "Service", zh: "服務" },
        value: {
          en: "Dedicated service team for every room",
          zh: "每間廳房配專屬服務團隊",
        },
      },
    ],
    occasions: [
      { en: "Corporate dining", zh: "企業宴請" },
      { en: "Celebrations", zh: "喜慶宴會" },
      { en: "Ceremonies", zh: "典禮儀式" },
    ],
    menus: [
      {
        label: { en: "Per Person", zh: "按位上" },
        line: {
          en: "Individually plated set menus",
          zh: "逐位擺盤的套餐菜單",
        },
        detail: { en: "Pricing on enquiry", zh: "價格歡迎查詢" },
      },
      {
        label: { en: "Per Table", zh: "按席計" },
        line: {
          en: "Traditional banquet menus, shared",
          zh: "傳統圍席宴會菜單",
        },
        detail: { en: "Pricing on enquiry", zh: "價格歡迎查詢" },
      },
    ],
    enquiryTarget: "/reserve",
  },
  reserve: {
    phone: "+1 000 000 0000",
    wechat: "CrystalJadeYVR",
    hours: [
      { en: "Lunch 11:00 to 14:30", zh: "午市 11:00 至 14:30" },
      { en: "Dinner 17:30 to 22:00", zh: "晚市 17:30 至 22:00" },
    ],
    address: {
      name: "GreenTee Richmond Center",
      line: {
        en: "0000 Garden Way, Richmond",
        zh: "列治文 Garden Way 0000 號",
      },
    },
  },
  socials: [
    { label: { en: "Xiaohongshu", zh: "小紅書" }, url: "#" },
    { label: { en: "Instagram", zh: "Instagram" }, url: "#" },
  ],
};
