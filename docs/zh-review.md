# Traditional Chinese review · Crystal Jade Palace

Every drafted zh-Hant string on the site, paired with its English source,
for native review in one pass. Generated from the live config
(`lib/content/`) and chrome dictionary (`lib/i18n.ts`); regenerate rather
than hand-edit the pairs when strings change.

## Conventions for the reviewer

- Register: Hong Kong fine dining (米芝蓮, never 米其林; 訂座; 午市 / 晚市).
- Never an em dash or an en dash in either language (no 破折號); ranges are
  written 2022 至 2025, times 11:00 至 14:30. No exclamation points.
- Chinese prose uses full-width punctuation.
- English placeholder copy stays placeholder in zh; those rows are marked.
- In display titles, `*word*` marks the champagne emphasis span and a
  literal `\n` (shown as a line break here) is a designed line break.
  Keep both in any revision.

## Rulings (closed, 2026-08-04)

Four brand items keep their English forms in zh copy, by ruling: the
restaurant trade name (Crystal Jade Palace), GreenTee Richmond Center,
award titles, and the address line. Closed, not pending: these reopen only
if the business supplies official Chinese names, which then land as Studio
content edits (the fields are locale objects), never code. The rows below
are marked "Ruling".

The brand word Michelin in flowing descriptive prose renders 米芝蓮 per the
register ruling; only formal award titles stay English.

## Restaurant content (Sanity-backed; edits land in Studio)

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `tagline` | A Michelin dining experience · The first in North America | 米芝蓮星級餐飲體驗 · 北美首家 |  |
| `lede` | Cantonese fine dining on the promenade. The first Crystal Jade Palace in North America, led by a Michelin-starred kitchen. | 海濱長廊上的高級粵菜食府。Crystal Jade Palace 首度落戶北美，由米芝蓮星級廚房主理。 |  |
| `intro.lede` | One of Asia's most respected Cantonese kitchens arrives in Richmond. | 亞洲最受尊崇的粵菜廚房之一，來到列治文。 |  |
| `intro.support` | Classical technique, premium ingredients, and a quiet creativity that never obscures either. Lunch and dinner daily, within GreenTee Richmond Center. | 經典功夫、上乘食材，加上一份從不喧賓奪主的靜靜創意。午市晚市每日供應，位於 GreenTee Richmond Center 內。 |  |
| `credentials[0].label` | Michelin | 米芝蓮 |  |
| `credentials[0].value` | Vancouver Michelin Star, four consecutive years | Vancouver Michelin Star，連續四年 | Ruling: award title stays English |
| `credentials[0].detail` | 2022 to 2025 | 2022 至 2025 |  |
| `credentials[1].label` | Accolades | 殊榮 |  |
| `credentials[1].value` | North America's Best Chinese Cuisine Restaurant, 2025 | North America's Best Chinese Cuisine Restaurant，2025 年 | Ruling: award title stays English |
| `credentials[1].detail` | Supreme Gold, World Championship of Chinese Cuisine 2024 | Supreme Gold, World Championship of Chinese Cuisine 2024 | Ruling: award title stays English |
| `credentials[2].label` | Private Dining | 私人宴請 |  |
| `credentials[2].value` | Private rooms and bespoke banquet menus | 私人廳房與度身宴會菜單 |  |
| `credentials[2].detail` | Corporate dining by arrangement | 企業宴請可作安排 |  |
| `privateDining.copy` | From board dinners to family celebrations, eight private rooms hold intimate parties and full banquet tables, each with dedicated service and menus composed for the occasion. | 由董事局晚宴到家庭喜慶，八間私人廳房可容納小敘至全席筵開，均配專屬服務，菜單為場合悉心編排。 |  |
| `privateDining.facts[0].label` | Private Rooms | 私人廳房 |  |
| `privateDining.facts[0].value` | Eight rooms | 八間廳房 |  |
| `privateDining.facts[0].detail` | Placeholder, confirm count | 暫代資料，房數待確認 | Placeholder, room count unconfirmed |
| `privateDining.facts[1].label` | Capacity | 容納人數 |  |
| `privateDining.facts[1].value` | From six guests to full banquet tables | 六位小敘至全席筵開 |  |
| `privateDining.facts[2].label` | Booking | 預訂 |  |
| `privateDining.facts[2].value` | Separate enquiry channel for private events | 私人宴會另設查詢渠道 |  |
| `story.heritage.lead` | Crystal Jade began with one Cantonese kitchen and grew into one of Asia's most respected names in fine dining. | Crystal Jade 由一間粵菜廚房起步，成長為亞洲最受尊崇的高級餐飲名字之一。 |  |
| `story.heritage.body[0]` | Across decades and cities, the group has carried the discipline of classical technique wherever it opens a door. The standard travels. The kitchen adapts. | 數十年間，足跡遍及各大城市，集團每開一扇門，都帶著經典功夫的嚴謹。標準隨行，廚房因地制宜。 |  |
| `story.footprint[0]` | Singapore | 新加坡 |  |
| `story.footprint[1]` | Hong Kong | 香港 |  |
| `story.footprint[2]` | Shanghai | 上海 |  |
| `story.footprint[3]` | Across Asia | 遍及亞洲 |  |
| `story.footprintNow` | Now, Richmond | 此刻，列治文 |  |
| `story.richmond.lead` | Richmond is home to one of the most discerning Cantonese dining audiences outside Asia. | 列治文擁有亞洲以外最懂粵菜的食客群之一。 |  |
| `story.richmond.body[0]` | Crystal Jade Palace comes here not to introduce the cuisine, but to honor how well this city already knows it. | Crystal Jade Palace 來到這裏，不是為了介紹粵菜，而是向這座早已深諳粵菜的城市致意。 |  |
| `story.richmond.body[1]` | The timing is simple. A room worthy of the kitchen became possible at GreenTee Richmond Center, and the kitchen was ready. | 時機很簡單。GreenTee Richmond Center 出現了一個配得上這個廚房的空間，而廚房亦已準備好。 |  |
| `story.philosophy[0].title` | Classical Technique | 經典功夫 |  |
| `story.philosophy[0].line` | Recipes held to the standard of the masters who wrote them. Nothing enters the menu until it survives that comparison. | 每道食譜都以寫下它的大師為準繩。未經這重比對，不會登上菜單。 |  |
| `story.philosophy[1].title` | Premium Ingredients | 上乘食材 |  |
| `story.philosophy[1].line` | Sourcing decides the ceiling of every dish. The kitchen sources accordingly, season by season. | 採購決定每道菜的上限。廚房按此嚴選，隨季而行。 |  |
| `story.philosophy[2].title` | Quiet Creativity | 靜靜創意 |  |
| `story.philosophy[2].line` | New ideas arrive slowly, and only when they deepen the original rather than decorate it. | 新意來得緩慢，只在深化原味而非裝點原味時，方才登場。 |  |
| `chef.intro` | A journey measured<br>in quiet *decades*. | 一段以靜靜*數十年*<br>丈量的旅途。 |  |
| `chef.awards[0].title` | Vancouver Michelin Star | Vancouver Michelin Star | Ruling: award title stays English |
| `chef.awards[0].detail` | Four consecutive years | 連續四年 |  |
| `chef.awards[0].years` | 2022 to 2025 | 2022 至 2025 |  |
| `chef.awards[1].title` | World Championship of Chinese Cuisine | World Championship of Chinese Cuisine | Ruling: award title stays English |
| `chef.awards[1].detail` | Individual Supreme Gold Award | Individual Supreme Gold Award | Ruling: award title stays English |
| `chef.awards[1].years` | 2024 | 2024 |  |
| `chef.awards[2].title` | North America's Best Chinese Cuisine Restaurant | North America's Best Chinese Cuisine Restaurant | Ruling: award title stays English |
| `chef.awards[2].years` | 2025 | 2025 |  |
| `chef.bio` | Twenty-three years across five-star kitchens, from Banyan Tree and Marriott to InterContinental and Pan Pacific. A culinary journey that began in China and now settles in Vancouver. | 二十三年五星級廚房歷練，由悅榕莊、萬豪到洲際、泛太平洋。廚藝之旅始於中國，如今落戶溫哥華。 |  |
| `chef.moments[0]` | Host to a Canadian Prime Minister and senators | 曾接待加拿大總理及參議員 |  |
| `chef.moments[1]` | Commended by a State Councilor of China | 獲中國國務委員讚許 |  |
| `chef.moments[2]` | Featured in culinary publications | 獲飲食刊物專題報道 |  |
| `chef.quote` | Cantonese cuisine rewards patience. My work is to let the ingredient speak first, and to speak second. | 粵菜回報耐性。我的本份，是讓食材先說話，自己再說。 | Placeholder pending the chef interview |
| `banquet.copy` | Corporate dinners, family celebrations, and ceremonies, held behind a closed door with a team assigned to the room. | 企業晚宴、家庭喜慶與典禮，於閉門廳房內進行，並有專責團隊駐房服務。 |  |
| `banquet.facts[0].label` | Private Rooms | 私人廳房 |  |
| `banquet.facts[0].value` | Eight rooms | 八間廳房 |  |
| `banquet.facts[0].detail` | Placeholder, confirm count | 暫代資料，房數待確認 | Placeholder, room count unconfirmed |
| `banquet.facts[1].label` | Capacity | 容納人數 |  |
| `banquet.facts[1].value` | From six guests to full banquet tables | 六位小敘至全席筵開 |  |
| `banquet.facts[2].label` | Service | 服務 |  |
| `banquet.facts[2].value` | Dedicated service team for every room | 每間廳房配專屬服務團隊 |  |
| `banquet.occasions[0]` | Corporate dining | 企業宴請 |  |
| `banquet.occasions[1]` | Celebrations | 喜慶宴會 |  |
| `banquet.occasions[2]` | Ceremonies | 典禮儀式 |  |
| `banquet.menus[0].label` | Per Person | 按位上 |  |
| `banquet.menus[0].line` | Individually plated set menus | 逐位擺盤的套餐菜單 |  |
| `banquet.menus[0].detail` | Pricing on enquiry | 價格歡迎查詢 |  |
| `banquet.menus[1].label` | Per Table | 按席計 |  |
| `banquet.menus[1].line` | Traditional banquet menus, shared | 傳統圍席宴會菜單 |  |
| `banquet.menus[1].detail` | Pricing on enquiry | 價格歡迎查詢 |  |
| `reserve.hours[0]` | Lunch 11:00 to 14:30 | 午市 11:00 至 14:30 |  |
| `reserve.hours[1]` | Dinner 17:30 to 22:00 | 晚市 17:30 至 22:00 |  |
| `reserve.address.line` | 0000 Garden Way, Richmond | 0000 Garden Way, Richmond | Ruling: address stays English |
| `socials[0].label` | Xiaohongshu | 小紅書 |  |
| `socials[1].label` | Instagram | Instagram |  |

## Dish lines (Sanity-backed; edits land in Studio)

Signature trio, in landing order: signature-crispy-roast-duck, wok-seared-lobster, crystal-har-gow.

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `crystal-har-gow.line` | Hand-pleated shrimp dumplings, bamboo shoot, translucent skin. | 手工摺褶鮮蝦餃，筍粒，皮薄晶瑩。 | Dish: Crystal Har Gow 水晶蝦餃 |
| `char-siu-sou.line` | Flaky baked pastry, honeyed barbecue pork. | 酥皮鬆化，蜜汁叉燒。 | Dish: Char Siu Sou 蜜汁叉燒酥 |
| `steamed-siu-mai.line` | Pork and prawn, crowned with flying fish roe. | 豬肉鮮蝦，綴以飛魚籽。 | Dish: Steamed Siu Mai 魚子燒賣 |
| `signature-crispy-roast-duck.line` | Lacquered skin, carved to order. | 脆皮如漆，即點即片。 | Dish: Signature Crispy Roast Duck 招牌脆皮燒鴨 |
| `crispy-pork-belly.line` | Glass-crisp crackling, five-spice salt. | 脆皮如玻璃，佐五香鹽。 | Dish: Crispy Pork Belly 化皮燒腩仔 |
| `wok-seared-lobster.line` | Ginger and scallion, superior stock. | 薑蔥爆香，上湯提鮮。 | Dish: Wok-Seared Lobster 薑蔥焗龍蝦 |
| `steamed-catch-of-the-day.line` | Whole fish, aged soy, hot oil finish. | 原條清蒸，陳年豉油，滾油淋香。 | Dish: Steamed Catch of the Day 清蒸游水海魚 |
| `braised-abalone-sea-cucumber.line` | Ten-hour master stock, seasonal greens. | 十小時老滷慢煨，配時令青蔬。 | Dish: Braised Abalone & Sea Cucumber 鮑魚扣遼參 |
| `wok-fried-beef-tenderloin.line` | Cantonese style, caramelized shallot. | 粵式做法，焦香乾蔥。 | Dish: Wok-Fried Beef Tenderloin 中式牛柳 |
| `chilled-mango-sago-pomelo.line` | A Crystal Jade classic, finished with fresh cream. | Crystal Jade 經典之作，鮮忌廉收結。 | Dish: Chilled Mango Sago Pomelo 楊枝甘露 |
| `double-boiled-almond-cream.line` | Stone-ground, served warm. | 石磨細研，暖飲上桌。 | Dish: Double-Boiled Almond Cream 生磨杏仁茶 |

## Chrome and interface strings (code dictionary, `lib/i18n.ts`)

Pending-frame strings are the designed placeholder state and read as
editor-facing instructions by design.

### Site chrome

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `chrome.skipToContent` | Skip to content | 跳至內容 |  |
| `chrome.header.navAria` | Crystal Jade Palace pages | Crystal Jade Palace 頁面 |  |
| `chrome.header.openMenu` | Open menu | 開啟選單 |  |
| `chrome.header.closeMenu` | Close menu | 關閉選單 |  |
| `chrome.header.menuAria` | Menu | 選單 |  |
| `chrome.header.bookATable` | Book a Table | 訂座 |  |
| `chrome.header.languageAria` | Language | 語言 |  |
| `chrome.detailsAria` | Crystal Jade Palace details | 餐廳資訊 |  |
| `chrome.daily` | , daily | ，每日供應 |  |
| `chrome.wechat` | WeChat | 微信 |  |
| `chrome.bookATable` | Book a Table | 訂座 |  |

### Landing

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `home.heroEyebrow` | Cantonese Fine Dining · GreenTee Richmond Center | 高級粵菜 · GreenTee Richmond Center |  |
| `home.heroFrame.kicker` | Full-screen visual | 全幅畫面 |  |
| `home.heroFrame.name` | Dining Room · Photo or Video Loop | 餐廳空間 · 照片或影片 |  |
| `home.heroFrame.tag` | Replace with restaurant photography or video loop | 待餐廳攝影或影片完成後替換 |  |
| `home.heroScrollAria` | Scroll to introduction | 捲動至簡介 |  |
| `home.trioEyebrow` | Signature Dishes | 招牌菜式 |  |
| `home.trioTitle` | From the *kitchen*. | 自*廚房*而來。 |  |
| `home.trioPhotoKicker` | Photo | 照片 |  |
| `home.viewFullMenu` | View the Full Menu | 瀏覽全份菜單 |  |
| `home.privateEyebrow` | Private Dining | 私人宴請 |  |
| `home.privateTitle` | Rooms for the occasions<br>that *matter*. | 為重要時刻<br>而設的*廳房*。 |  |
| `home.privateFrame.kicker` | Image placeholder | 圖片預留位 |  |
| `home.privateFrame.name` | Private Dining Room | 私人宴會廳 |  |
| `home.privateFrame.tag` | Replace with final photography | 待正式攝影完成後替換 |  |
| `home.banquetCta` | Banquet & Private Dining | 宴會及私人宴請 |  |

### Story page

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `story.bandEyebrow` | Our Story | 我們的故事 |  |
| `story.bandTitle` | From a single kitchen<br>to the world. | 由一間廚房<br>走向世界。 |  |
| `story.bandFrame.kicker` | Image placeholder | 圖片預留位 |  |
| `story.bandFrame.name` | Crystal Jade Brand Imagery | Crystal Jade 品牌影像 |  |
| `story.bandFrame.tag` | Replace with brand photography per brand guide | 待依品牌指引替換品牌攝影 |  |
| `story.heritageEyebrow` | Heritage | 傳承 |  |
| `story.heritageTitle` | Carried across the region's<br>great *cities*. | 走遍區內<br>各大*名城*。 |  |
| `story.heritageFrame.kicker` | Map placeholder | 地圖預留位 |  |
| `story.heritageFrame.name` | Global Footprint | 全球據點 |  |
| `story.heritageFrame.tag` | Confirm footprint list with Crystal Jade brand guide | 據點名單待品牌指引確認 |  |
| `story.richmondEyebrow` | Why Richmond, Why Now | 為何列治文，為何此刻 |  |
| `story.richmondTitle` | Not an introduction.<br>A *homecoming*. | 不是初來乍到，<br>而是*歸來*。 |  |
| `story.richmondFrame.kicker` | Image placeholder | 圖片預留位 |  |
| `story.richmondFrame.name` | Richmond · The Vancouver Chapter | 列治文 · 溫哥華篇章 |  |
| `story.richmondFrame.tag` | Replace with final photography | 待正式攝影完成後替換 |  |
| `story.philosophyEyebrow` | Kitchen Philosophy | 廚房哲學 |  |
| `story.philosophyTitle` | Three ideas, held *quietly*. | 三個信念，*靜靜*持守。 |  |
| `story.conceptKicker` | Concept image | 概念圖片 |  |

### Chef page

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `chef.eyebrow` | The Chef | 主廚 |  |
| `chef.portraitFrame.kicker` | Portrait placeholder | 肖像預留位 |  |
| `chef.portraitFrame.name` | Chef Portrait · Kitchen Setting | 主廚肖像 · 廚房實景 |  |
| `chef.portraitFrame.tag` | Kitchen setting, not a studio headshot | 廚房實景，非影樓照 |  |
| `chef.hisStory` | His Story | 他的故事 |  |
| `chef.notableMoments` | Notable Moments | 重要時刻 |  |
| `chef.emblemNote` | Emblems are placeholders. Replace with official award assets. | 徽章為暫代圖樣，待官方獎項素材替換。 |  |
| `chef.quoteCite` | In His Own Words · Placeholder, replace with chef interview | 主廚自述 · 暫代文字，待主廚訪問後替換 |  |

### Menu page

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `menu.bandEyebrow` | The Menu | 菜單 |  |
| `menu.bandTitle` | Signature *dishes*. | 招牌*菜式*。 |  |
| `menu.bandLine` | Dishes that change with the seasons. Technique that does not. | 菜式隨四季更替，功夫始終如一。 |  |
| `menu.bandFrame.kicker` | Full-width banner | 全幅橫額 |  |
| `menu.bandFrame.name` | Signature Dish · Editorial Photography | 招牌菜式 · 編輯級攝影 |  |
| `menu.bandFrame.tag` | Replace with final dish photography | 待正式菜式攝影完成後替換 |  |
| `menu.grid.allDishes` | All Dishes | 全部菜式 |  |
| `menu.grid.categories.dimsum` | Dim Sum | 點心 |  |
| `menu.grid.categories.roast` | Roasted Meats | 燒味 |  |
| `menu.grid.categories.seafood` | Seafood | 海鮮 |  |
| `menu.grid.categories.mains` | Mains | 主菜 |  |
| `menu.grid.categories.desserts` | Desserts | 甜品 |  |
| `menu.grid.photoKicker` | Large-format photo | 大幅照片 |  |
| `menu.closing` | Our menu evolves with the seasons and the chef's current inspiration. | 菜單隨四季與主廚當下的靈感而變。 |  |

### Banquet page

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `banquet.bandEyebrow` | Banquet & Private Dining | 宴會及私人宴請 |  |
| `banquet.bandTitle` | Rooms for the occasions<br>that *matter*. | 為重要時刻<br>而設的*廳房*。 |  |
| `banquet.bandLine` | Private rooms, dedicated service, and menus composed for the table. | 私人廳房、專屬服務，以及為整席而設的菜單。 |  |
| `banquet.bandFrame.kicker` | Image placeholder | 圖片預留位 |  |
| `banquet.bandFrame.name` | Banquet Hall · Private Dining Room | 宴會廳 · 私人廳房 |  |
| `banquet.bandFrame.tag` | Replace with final photography | 待正式攝影完成後替換 |  |
| `banquet.servicesEyebrow` | Banquet Services | 宴會服務 |  |
| `banquet.servicesTitle` | Composed around<br>the *table*. | 圍繞*一席*<br>悉心編排。 |  |
| `banquet.occasionsLabel` | Occasions | 場合 |  |
| `banquet.tableFrame.kicker` | Food image | 菜式圖片 |  |
| `banquet.tableFrame.name` | Banquet Table | 宴會餐桌 |  |
| `banquet.tableFrame.tag` | Replace with final photography | 待正式攝影完成後替換 |  |
| `banquet.bespokeEyebrow` | Bespoke Menus | 度身菜單 |  |
| `banquet.bespokeTitle` | Two ways to<br>*compose*. | 兩種*編排*<br>之道。 |  |
| `banquet.enquireNow` | Enquire Now | 立即查詢 |  |
| `banquet.courseFrame.kicker` | Image placeholder | 圖片預留位 |  |
| `banquet.courseFrame.name` | Composed Course | 擺盤菜式 |  |
| `banquet.courseFrame.tag` | Replace with final photography | 待正式攝影完成後替換 |  |

### Reserve page

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `reserve.eyebrow` | Reserve | 訂座 |  |
| `reserve.title` | A table *awaits*. | 為您*留座*。 |  |
| `reserve.telephone` | Telephone | 電話 |  |
| `reserve.wechat` | WeChat | 微信 |  |
| `reserve.hours` | Hours | 營業時間 |  |
| `reserve.address` | Address | 地址 |  |
| `reserve.placeholder` | Placeholder | 暫代資料 |  |
| `reserve.placeholderDaily` | Placeholder, daily | 暫代資料，每日 |  |
| `reserve.crosslink` | Planning a private event? Banquet & Private Dining | 籌備私人宴會？宴會及私人宴請 |  |
| `reserve.embedFrame.kicker` | OpenTable embed placeholder | OpenTable 嵌入預留位 |  |
| `reserve.embedFrame.name` | Online Reservations | 網上訂座 |  |

### Metadata (titles and descriptions)

| Field | English | 繁體中文 | Notes |
| --- | --- | --- | --- |
| `meta.titleDefault` | Crystal Jade Palace | Crystal Jade Palace |  |
| `meta.titleTemplate` | %s · Crystal Jade Palace | %s · Crystal Jade Palace |  |
| `meta.siteDescription` | Cantonese fine dining at GreenTee Richmond Center. The first Crystal Jade Palace in North America, led by a Michelin-starred kitchen. | GreenTee Richmond Center 內的高級粵菜食府。Crystal Jade Palace 首度落戶北美，由米芝蓮星級廚房主理。 |  |
| `meta.story.title` | Our Story | 我們的故事 |  |
| `meta.story.description` | From a single Cantonese kitchen to one of Asia's most respected names in fine dining, now arriving in Richmond. | 由一間粵菜廚房，成為亞洲最受尊崇的高級餐飲名字之一，此刻來到列治文。 |  |
| `meta.chef.title` | The Chef | 主廚 |  |
| `meta.chef.description` | A Michelin-starred kitchen led by twenty-three years across five-star kitchens, from China to Vancouver. | 米芝蓮星級廚房，主廚歷經二十三年五星級廚房歷練，從中國到溫哥華。 |  |
| `meta.menu.title` | Menu | 菜單 |  |
| `meta.menu.description` | Signature Cantonese dishes across dim sum, roasted meats, seafood, mains, and desserts, changing with the seasons. | 招牌粵菜遍及點心、燒味、海鮮、主菜與甜品，隨四季更替。 |  |
| `meta.banquet.title` | Banquet | 宴會 |  |
| `meta.banquet.description` | Private rooms, dedicated service, and bespoke banquet menus composed for the table. | 私人廳房、專屬服務，以及為整席悉心編排的宴會菜單。 |  |
| `meta.reserve.title` | Reserve | 訂座 |  |
| `meta.reserve.description` | Book a table at Crystal Jade Palace by telephone, WeChat, or online, for lunch and dinner daily. | 歡迎致電、微信或網上預訂 Crystal Jade Palace 餐桌，午市晚市每日供應。 |  |
