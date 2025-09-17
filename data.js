// === ДАННЫЕ ДЛЯ РЕДАКТИРОВАНИЯ ===

// Текстовые переводы
const STR = {
  ru: {
    topbarSubtitle: "UZBEK EATERY",
    changeLanguage: "Язык",
    dishOfDay: "Блюдо дня",
    dishOfDayDesc: "Подборка хитов BOBOY: лагман, шашлыки и казан‑кабаб.",
    chefRecommends: "Рекомендует шеф",
    vegetarian: "Вегетарианское",
    searchPlaceholder: "Поиск по меню…",
    vegOnly: "Только вегетарианское",
    locations: "Адреса",
    footerCopy: "Атмосфера Узбекистана: уникальные ароматы и вкусы.",
    allergyNote: "Пожалуйста, предупредите нас о любых аллергиях. Состав блюд может незначительно отличаться.",
    addToOrder: "В заказ",
    cartTitle: "Ваш заказ / Калькулятор",
    cartEmpty: "Ваша корзина пуста",
    subtotal: "Подытог",
    serviceCharge: "Процент за обслуживание (%)",
    total: "ИТОГО",
    clearCart: "Очистить заказ",
    tabOrder: "Принять заказ",
    tabGroup: "Расчет на группу",
    groupItem: "Выберите блюдо или сет:",
    groupPeople: "Количество человек:",
    groupPerPerson: "Цена на человека:",
    groupTotal: "Общая стоимость:",
    drinks: "Напитки",
    drinks_coffee: "Кофе",
    drinks_tea: "Чай",
    drinks_cold: "Холодные напитки",
    drinks_juices: "Соки",
    drinks_hot_chocolate: "Горячий шоколад"
  },
  en: {
    topbarSubtitle: "UZBEK EATERY",
    changeLanguage: "Language",
    dishOfDay: "Dish of the Day",
    dishOfDayDesc: "BOBOY best-sellers: lagman, kebabs and kazan kebab.",
    chefRecommends: "Chef recommends",
    vegetarian: "Vegetarian",
    searchPlaceholder: "Search the menu…",
    vegOnly: "Vegetarian only",
    locations: "Locations",
    footerCopy: "Immerse yourself in Uzbekistan’s unique tastes and aromas.",
    allergyNote: "Please let us know about any allergies. Ingredients may vary slightly.",
    addToOrder: "Add to order",
    cartTitle: "Your Order / Calculator",
    cartEmpty: "Your cart is empty",
    subtotal: "Subtotal",
    serviceCharge: "Service Charge (%)",
    total: "TOTAL",
    clearCart: "Clear Order",
    tabOrder: "Take Order",
    tabGroup: "Group Calculator",
    groupItem: "Select item or set:",
    groupPeople: "Number of people:",
    groupPerPerson: "Price per person:",
    groupTotal: "Total cost:",
    drinks: "Drinks",
    drinks_coffee: "Coffee",
    drinks_tea: "Tea",
    drinks_cold: "Cold drinks",
    drinks_juices: "Juices",
    drinks_hot_chocolate: "Hot chocolate"
  },
  uz: {
    topbarSubtitle: "UZBEK EATERY",
    changeLanguage: "Til",
    dishOfDay: "Kun taomi",
    dishOfDayDesc: "BOBOY xitlari: lag'mon, kabob va qozon kabob.",
    chefRecommends: "Shef tavsiya qiladi",
    vegetarian: "Vegetarian",
    searchPlaceholder: "Menyu bo‘yicha qidirish…",
    vegOnly: "Faqat vegetarian",
    locations: "Manzillar",
    footerCopy: "Oʻzbekistonning oʻziga xos tamlari va hidlari.",
    allergyNote: "Allergiyangiz bo‘lsa, oldindan ayting. Tarkib biroz farq qilishi mumkin.",
    addToOrder: "Qo'shish",
    cartTitle: "Sizning buyurtmangiz / Kalkulyator",
    cartEmpty: "Sizning savatingiz bo'sh",
    subtotal: "Jami",
    serviceCharge: "Xizmat haqi (%)",
    total: "UMUMIY",
    clearCart: "Buyurtmani tozalash",
    tabOrder: "Buyurtma berish",
    tabGroup: "Guruh uchun hisoblash",
    groupItem: "Taom yoki to'plamni tanlang:",
    groupPeople: "Odamlar soni:",
    groupPerPerson: "Bir kishi uchun narx:",
    groupTotal: "Umumiy narx:",
    drinks: "Ichimliklar",
    drinks_coffee: "Kofe",
    drinks_tea: "Choy",
    drinks_cold: "Sovuq ichimliklar",
    drinks_juices: "Sharbatlar",
    drinks_hot_chocolate: "Issiq shokolad"
  }
};

// Данные меню
const MENU = {
  heroIds: ["plov", "lagman_uyghur", "beef_kebab", "kazan_kebab"],
  categories: {
    starters: ["suzma", "marinated_veg", "kulcha", "garlic_nan", "khach_ap", "khach_meg", "cheb_beef", "cheb_cheese", "somsa_trad", "somsa_olot", "turkish_meze"],
    salads: ["achik", "caesar", "greek", "bakhor", "olivier", "eggplant_tempura", "choban", "fresh_veg_assort", "chirokchi", "smak", "mens_caprice", "tulum", "thai_beef"],
    soups: ["kainatma", "lagman_uyghur", "mastava", "chicken_noodle", "chuchvara", "moshxurda", "lentil", "shurpa_jug", "manpar"],
    mains: ["say_beef", "manti", "kazan_kebab", "fried_lagman", "norin", "vaguri", "dolma", "assort_set", "sokoro", "somboro", "beshbarmak", "nohot_shurak", "stew", "halim", "say_chicken", "say_beef_egg", "plov"],
    kebabs: ["minced_beef", "beef_kebab", "lamb_kebab", "lamb_chops", "chicken_wings", "veg_kebab", "chicken_thighs", "liver", "lamb_ribs", "roulettes", "charvi"],
    sides: ["french_fries", "rice"],
    desserts: ["napoleon", "nuts", "honey_cake", "meringue_rolls", "afghan", "san_sebastian", "tiramisu", "kiev", "snickers_rolls", "chocolate_fondue", "profiteroles", "bakhlava", "matilda", "chak_chak", "assort_milli"],
    drinks_coffee: ["americano", "long_black", "latte", "cappuccino", "latte_macchiato", "latte_macchiato_pistachio", "mocha", "espresso", "flat_white", "affogato", "raf", "macchiato"],
    drinks_hot_chocolate: ["dark_chocolate", "milk_chocolate"],
    drinks_cold: ["iced_tea", "fruit_decanter", "hibiscus_cherry", "frappuccino_mocha", "frappuccino_caramel", "cold_latte", "cold_americano", "cold_mocha", "cold_spanish_latte", "cold_matcha_latte", "coca_cola", "fanta", "sprite", "red_bull", "blanc_blue_025", "blanc_blue_05", "turon_025", "turon_05", "mojito", "strawberry_mojito", "classic_mojito", "red_bull_mojito", "passionfruit_mojito", "milkshakes", "smoothies", "lemonades", "compote", "ayran"],
    drinks_juices: ["orange_juice", "apple_juice", "carrot_juice", "apple_carrot", "apple_orange", "apple_orange_carrot", "grapefruit"],
    drinks_tea: ["leaf_tea_assam", "leaf_tea_assam_lemon", "green_gunpowder", "green_jasmine", "navvat", "black_tea", "black_tea_lemon", "green_tea", "special_hibiscus", "special_strawberry", "special_bardak", "special_turkish", "special_immune", "special_sea_buckthorn", "special_anti_stress", "special_shirchoy", "special_moroccan", "curtis_summer", "curtis_earl", "curtis_hugo", "curtis_mango", "curtis_blueberries"]
  },
  catNames: {
    ru: {
      starters: "Закуски",
      salads: "Салаты",
      soups: "Супы",
      mains: "Горячие блюда",
      kebabs: "Шашлыки",
      sides: "Гарниры",
      desserts: "Десерты",
      drinks: "Напитки",
      drinks_coffee: "Кофе",
      drinks_hot_chocolate: "Горячий шоколад",
      drinks_cold: "Холодные напитки",
      drinks_juices: "Соки",
      drinks_tea: "Чай"
    },
    en: {
      starters: "Starters",
      salads: "Salads",
      soups: "Soups",
      mains: "Main Courses",
      kebabs: "Kebabs",
      sides: "Side Dishes",
      desserts: "Desserts",
      drinks: "Drinks",
      drinks_coffee: "Coffee",
      drinks_hot_chocolate: "Hot Chocolate",
      drinks_cold: "Cold Drinks",
      drinks_juices: "Juices",
      drinks_tea: "Tea"
    },
    uz: {
      starters: "Yaxna taomlar",
      salads: "Salatlar",
      soups: "Sho‘rvalar",
      mains: "Asosiy taomlar",
      kebabs: "Kaboblar",
      sides: "Garnirlar",
      desserts: "Shirinliklar",
      drinks: "Ichimliklar",
      drinks_coffee: "Kofe",
      drinks_hot_chocolate: "Issiq shokolad",
      drinks_cold: "Sovuq ichimliklar",
      drinks_juices: "Sharbatlar",
      drinks_tea: "Choy"
    }
  },
  items: {
    // Закуски
    khach_ap: {
      id: "khach_ap",
      price: 73000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Хачапури по-аджарски",
          en: "Khachapuri (Adjarian)",
          uz: "Xachapuri-Ajar"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    kazan_kebab: {
      id: "kazan_kebab",
      price: 159000,
      veg: false,
      image: "assets/kazan-kebab.webp",
      i18n: {
        name: {
          ru: "Казан-кабоб",
          en: "Kazan Kebab",
          uz: "Qozon kabob"
        },
        desc: {
          ru: "Казан‑кабаб — мясо и картофель в казане.",
          en: "Kazan kebab — hearty meat & potatoes.",
          uz: "Qozon kabob — go'sht va kartoshka."
        }
      }
    },
    suzma: {
      id: "suzma",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Сузма",
          en: "Suzma",
          uz: "Suzma"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    marinated_veg: {
      id: "marinated_veg",
      price: 38000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Маринованные овощи",
          en: "Marinated Vegetables",
          uz: "Tuzlangan sabzavotlar"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    kulcha: {
      id: "kulcha",
      price: 15000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Домашний хлеб (кулча)",
          en: "House Bread (Kulcha)",
          uz: "Non (Kulcha)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    garlic_nan: {
      id: "garlic_nan",
      price: 28000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Чесночный нан",
          en: "Garlic Nan",
          uz: "Sarimsoqli non"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    khach_meg: {
      id: "khach_meg",
      price: 73000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Хачапури по-мегрельски",
          en: "Khachapuri (Megrelian)",
          uz: "Xachapuri-Megrel"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cheb_beef: {
      id: "cheb_beef",
      price: 40000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Мини-чебурек с говядиной (4 шт)",
          en: "Mini Cheburek with Beef (4 pcs)",
          uz: "Mini cheburek (go‘shtli) (4 dona)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cheb_cheese: {
      id: "cheb_cheese",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Мини-чебурек с сыром (4 шт)",
          en: "Mini Cheburek with Cheese (4 pcs)",
          uz: "Mini cheburek (pishloqli) (4 dona)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    somsa_trad: {
      id: "somsa_trad",
      price: 20000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Самса традиционная",
          en: "Somsa Traditional",
          uz: "Tandir somsa"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    somsa_olot: {
      id: "somsa_olot",
      price: 15000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Самса Олот",
          en: "Somsa Olot",
          uz: "Olot somsa"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    turkish_meze: {
      id: "turkish_meze",
      price: 95000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Турецский мезе сет",
          en: "Turkish Meze Set",
          uz: "Turkcha mezze seti"
        },
        desc: {
          ru: "Аджи Эзме, Оливки, Хумус, Гарлик Нан, Суджук, Хайдари",
          en: "Adji Ezme, Olives, Hummus, Garlic Nan, Sudzhuk, Haydari",
          uz: "Adji ezme, zaytun, humus, sarimsoq non, sudjuk, xaydari"
        }
      }
    },

    // Салаты
    achik: {
      id: "achik",
      price: 29000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Ачик-чучук",
          en: "Achik Chuchuk",
          uz: "Achik chuchuk"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    caesar: {
      id: "caesar",
      price: 89000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Цезарь с курицей",
          en: "Caesar with Chicken",
          uz: "Salat Sezar tovuqli"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    greek: {
      id: "greek",
      price: 79000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Греческий салат",
          en: "Greek Salad",
          uz: "Greck salad"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    bakhor: {
      id: "bakhor",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Салат Бахор",
          en: "Salat Bakhor",
          uz: "Bahor salati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    olivier: {
      id: "olivier",
      price: 63000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Оливье",
          en: "Olivier Salad",
          uz: "Salat Olivye"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    eggplant_tempura: {
      id: "eggplant_tempura",
      price: 69000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Салат с баклажаном темпура",
          en: "Eggplant Tempura Salad",
          uz: "Qarsildoq baqlajon"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    choban: {
      id: "choban",
      price: 69000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Чобан салат",
          en: "Choban Salad",
          uz: "Choban salat"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    fresh_veg_assort: {
      id: "fresh_veg_assort",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Ассорти из свежих овощей",
          en: "Fresh Vegetable Assortment",
          uz: "Yangi sabzavotlar assorti"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    chirokchi: {
      id: "chirokchi",
      price: 55000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Салат Чирокчи",
          en: "Chirokchi Salad",
          uz: "Chirokchi salati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    smak: {
      id: "smak",
      price: 55000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Салат Смак",
          en: "Smak Salad",
          uz: "Smak salati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    mens_caprice: {
      id: "mens_caprice",
      price: 75000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Салат Мужской каприз",
          en: "Men's Caprice Salad",
          uz: "Erkaklar kaprizi salati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    tulum: {
      id: "tulum",
      price: 65000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Салат Тулум",
          en: "Tulum Salad",
          uz: "Tulum salati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    thai_beef: {
      id: "thai_beef",
      price: 85000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Теплый тайский салат с говядиной",
          en: "Warm Thai Beef Salad",
          uz: "Issiq tailand mol go'shti salati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Супы
    kainatma: {
      id: "kainatma",
      price: 79000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Кайнатма шурпа",
          en: "Kainatma Shurpa",
          uz: "Qaynatma sho‘rva"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    lagman_uyghur: {
      id: "lagman_uyghur",
      price: 63000,
      veg: false,
      image: "assets/lagman-uygurskiy.webp",
      i18n: {
        name: {
          ru: "Лагман уйгурский",
          en: "Lagman Uyghur",
          uz: "Uyg‘ur lag‘mon"
        },
        desc: {
          ru: "Классический лагман на ручной лапше.",
          en: "Classic Uyghur lagman with hand‑pulled noodles.",
          uz: "Qo'l tortilgan lag'mon."
        }
      }
    },
    mastava: {
      id: "mastava",
      price: 55000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Мастава",
          en: "Mastava",
          uz: "Mastava"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    chicken_noodle: {
      id: "chicken_noodle",
      price: 49000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Куриный суп с лапшой",
          en: "Chicken Noodle Soup",
          uz: "Tovuqli sho‘rva"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    chuchvara: {
      id: "chuchvara",
      price: 61000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Чучвара",
          en: "Chuchvara",
          uz: "Chuchvara"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    moshxurda: {
      id: "moshxurda",
      price: 65000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Мошхурда",
          en: "Moshxurda",
          uz: "Moshxo‘rda"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    lentil: {
      id: "lentil",
      price: 40000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Чечевичный суп",
          en: "Lentil Soup",
          uz: "Yasmiq sho'rva"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    shurpa_jug: {
      id: "shurpa_jug",
      price: 75000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Шурпа в кувшине",
          en: "Shurpa in a Jug",
          uz: "Kuzgada sho‘rva"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    manpar: {
      id: "manpar",
      price: 55000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Манпар",
          en: "Manpar",
          uz: "Manpar"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Основные блюда
    festive_pilaf: {
      id: "festive_pilaf",
      price: 50000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Праздничный плов",
          en: "Festive Pilaf",
          uz: "Osh"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    plov: {
      id: "plov",
      price: 50000,
      veg: false,
      image: "assets/Plov.webp",
      i18n: {
        name: {
          ru: "Праздничный плов",
          en: "Festive Plov",
          uz: "To'y oshi"
        },
        desc: {
          ru: "Традиционный узбекский плов с бараниной",
          en: "Traditional Uzbek plov with lamb",
          uz: "An'anaviy o'zbek oshi"
        }
      }
    },
    say_beef: {
      id: "say_beef",
      price: 89000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Сай говяжий",
          en: "Beef SAY",
          uz: "Go‘shtli Say"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    manti: {
      id: "manti",
      price: 19000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Манты (1 шт)",
          en: "Manti (1 pc)",
          uz: "Manti (1 dona)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    fried_lagman: {
      id: "fried_lagman",
      price: 73000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Лагман жареный",
          en: "Fried Lagman",
          uz: "Qovurma lag‘mon"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    norin: {
      id: "norin",
      price: 93000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Норин",
          en: "Norin",
          uz: "Norin"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    vaguri: {
      id: "vaguri",
      price: 89000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Вагури (300 г)",
          en: "Vaguri (300g)",
          uz: "Vaguri (300 gr)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    dolma: {
      id: "dolma",
      price: 75000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Долма (Ток Ош)",
          en: "Dolma (Tok Osh)",
          uz: "Dolma (To‘q osh)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    assort_set: {
      id: "assort_set",
      price: 189000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Набор Ассорти Бобой",
          en: "Boboy Assortment Set",
          uz: "Boboy assorti to‘plami"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    sokoro: {
      id: "sokoro",
      price: 95000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Сокоро",
          en: "Sokoro",
          uz: "Soqoro"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    somboro: {
      id: "somboro",
      price: 85000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Сомборо",
          en: "Somboro",
          uz: "Somboro"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    beshbarmak: {
      id: "beshbarmak",
      price: 99000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Бешбармак",
          en: "Beshbarmak",
          uz: "Beshbarmoq"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    nohot_shurak: {
      id: "nohot_shurak",
      price: 75000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Нохот Шурак",
          en: "Nohot Shurak",
          uz: "Noxat shurak"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    stew: {
      id: "stew",
      price: 85000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Тушенка",
          en: "Stew",
          uz: "Qayla"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    halim: {
      id: "halim",
      price: 65000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Халим",
          en: "Halim",
          uz: "Halim"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    say_chicken: {
      id: "say_chicken",
      price: 79000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "SAY с курицей",
          en: "SAY with Chicken",
          uz: "Tovuqli Say"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    say_beef_egg: {
      id: "say_beef_egg",
      price: 95000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "SAY с говядиной и яйцом",
          en: "SAY with Beef and Egg",
          uz: "Go‘shtli va tuxumli Say"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Шашлыки
    minced_beef: {
      id: "minced_beef",
      price: 35000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Кийма шашлык",
          en: "Minced Beef Kebab",
          uz: "Qiyma kabob"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    beef_kebab: {
      id: "beef_kebab",
      price: 43000,
      veg: false,
      image: "assets/shashlik-mol_jaz.webp",
      i18n: {
        name: {
          ru: "Шашлык из говядины",
          en: "Beef Kebab",
          uz: "Mol jaz"
        },
        desc: {
          ru: "Сочные шашлыки с мангала.",
          en: "Juicy kebabs from the grill.",
          uz: "Shirador kaboblar."
        }
      }
    },
    lamb_kebab: {
      id: "lamb_kebab",
      price: 45000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Шашлык из баранины",
          en: "Lamb Kebab",
          uz: "Qo‘y jaz"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    lamb_chops: {
      id: "lamb_chops",
      price: 75000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Каре ягнёнка",
          en: "Lamb chops",
          uz: "Qo‘zi qovurg‘asi"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    chicken_wings: {
      id: "chicken_wings",
      price: 42000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Куриные крылья",
          en: "Chicken Wings",
          uz: "Tovuq qanoti"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    veg_kebab: {
      id: "veg_kebab",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Овощной шашлык",
          en: "Vegetarian Kebab",
          uz: "Sabzavotli kabob"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    chicken_thighs: {
      id: "chicken_thighs",
      price: 45000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Куриные бедра",
          en: "Chicken Thighs",
          uz: "Tovuq soni"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    liver: {
      id: "liver",
      price: 38000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Печень",
          en: "Liver",
          uz: "Jigar"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    lamb_ribs: {
      id: "lamb_ribs",
      price: 85000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Бараньи хрустящие ребрышки",
          en: "Crispy Lamb Ribs",
          uz: "Qo‘y qovurg‘asi"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    roulettes: {
      id: "roulettes",
      price: 55000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Рулетики",
          en: "Roulettes",
          uz: "Ruletlar"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    charvi: {
      id: "charvi",
      price: 65000,
      veg: false,
      image: "",
      i18n: {
        name: {
          ru: "Кебаб Чарви",
          en: "Charvi Kebab",
          uz: "Charvi kabob"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Гарниры
    french_fries: {
      id: "french_fries",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Картофель фри",
          en: "French Fries",
          uz: "Fri kartoshka"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    rice: {
      id: "rice",
      price: 15000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Рис",
          en: "Rice",
          uz: "Guruch"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Десерты
    napoleon: {
      id: "napoleon",
      price: 69000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Наполеон",
          en: "Napoleon",
          uz: "Napoleon"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    nuts: {
      id: "nuts",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Орешки (6 шт)",
          en: "Nuts (6 pcs)",
          uz: "Yong‘oq (6 dona)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    honey_cake: {
      id: "honey_cake",
      price: 72000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Медовик",
          en: "Honey Cake",
          uz: "Medovik"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    meringue_rolls: {
      id: "meringue_rolls",
      price: 55000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Меренговые рулетики",
          en: "Meringue Rolls",
          uz: "Mering rulolari"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    afghan: {
      id: "afghan",
      price: 65000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Афганский десерт",
          en: "Afghan Dessert",
          uz: "Afgon shirinligi"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    san_sebastian: {
      id: "san_sebastian",
      price: 79000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Сан-Себастьян",
          en: "San Sebastian Cheesecake",
          uz: "San Sebastyan"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    tiramisu: {
      id: "tiramisu",
      price: 75000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Тирамису",
          en: "Tiramisu",
          uz: "Tiramisu"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    kiev: {
      id: "kiev",
      price: 65000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Киев",
          en: "Kiev",
          uz: "Kiyev"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    snickers_rolls: {
      id: "snickers_rolls",
      price: 55000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Рулетики Сникерс",
          en: "Snickers Rolls",
          uz: "Snickers rulolari"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    chocolate_fondue: {
      id: "chocolate_fondue",
      price: 85000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Шоколадное фондю",
          en: "Chocolate Fondue",
          uz: "Shokolad fondyu"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    profiteroles: {
      id: "profiteroles",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Профитроли",
          en: "Profiteroles",
          uz: "Profiterol"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    bakhlava: {
      id: "bakhlava",
      price: 59000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Пахлава",
          en: "Bakhlava",
          uz: "Paxlava"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    matilda: {
      id: "matilda",
      price: 75000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Матильда",
          en: "Matilda",
          uz: "Matilda"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    chak_chak: {
      id: "chak_chak",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Чизкейк Чак-Чак",
          en: "Chak-Chak Cheesecake",
          uz: "Chak-chak chizkeyk"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    assort_milli: {
      id: "assort_milli",
      price: 125000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Набор Ассорти Милли",
          en: "Milli Assortment Set",
          uz: "Milliy assorti to‘plami"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Кофе
    americano: {
      id: "americano",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Американо",
          en: "Americano",
          uz: "Americano"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    long_black: {
      id: "long_black",
      price: 28000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Лонг Блэк",
          en: "Long Black",
          uz: "Long Black"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    latte: {
      id: "latte",
      price: 32000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Латте",
          en: "Latte",
          uz: "Latte"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cappuccino: {
      id: "cappuccino",
      price: 32000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Капучино",
          en: "Cappuccino",
          uz: "Cappuccino"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    latte_macchiato: {
      id: "latte_macchiato",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Латте макиато",
          en: "Latte Macchiato",
          uz: "Latte makkiato"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    latte_macchiato_pistachio: {
      id: "latte_macchiato_pistachio",
      price: 38000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Латте макиато с фисташками",
          en: "Latte Macchiato with Pistachio",
          uz: "Pistaqli latte makkiato"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    mocha: {
      id: "mocha",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Мокко",
          en: "Mocha",
          uz: "Mocha"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    espresso: {
      id: "espresso",
      price: 22000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Эспрессо",
          en: "Espresso",
          uz: "Espresso"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    flat_white: {
      id: "flat_white",
      price: 32000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Флэт Уайт",
          en: "Flat White",
          uz: "Flat White"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    affogato: {
      id: "affogato",
      price: 38000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Аффогато",
          en: "Affogato",
          uz: "Affogato"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    raf: {
      id: "raf",
      price: 38000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Раф",
          en: "Raf",
          uz: "Raf"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    macchiato: {
      id: "macchiato",
      price: 28000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Макиато",
          en: "Macchiato",
          uz: "Makkiato"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Горячий шоколад
    dark_chocolate: {
      id: "dark_chocolate",
      price: 32000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Темный",
          en: "Dark Chocolate",
          uz: "Qora shokolad"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    milk_chocolate: {
      id: "milk_chocolate",
      price: 32000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Молочный",
          en: "Milk Chocolate",
          uz: "Sutli shokolad"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Холодные напитки
    iced_tea: {
      id: "iced_tea",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Холодный чай",
          en: "Iced Tea",
          uz: "Muzlatilgan choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    fruit_decanter: {
      id: "fruit_decanter",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Фрукты (декантер)",
          en: "Fruit (decanter)",
          uz: "Meva (dekanter)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    hibiscus_cherry: {
      id: "hibiscus_cherry",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Гибискус с вишней (декантер)",
          en: "Hibiscus with Cherry (decanter)",
          uz: "Gibiskus va gilos (dekanter)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    frappuccino_mocha: {
      id: "frappuccino_mocha",
      price: 42000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Фраппучино Мокко",
          en: "Frappuccino Mocha",
          uz: "Frappuchino Mocha"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    frappuccino_caramel: {
      id: "frappuccino_caramel",
      price: 42000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Фраппучино Карамель",
          en: "Frappuccino Caramel",
          uz: "Frappuchino Karamel"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cold_latte: {
      id: "cold_latte",
      price: 38000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Холодный кофе Латте",
          en: "Cold Coffee Latte",
          uz: "Sovuq kofe Latte"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cold_americano: {
      id: "cold_americano",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Холодный Американо",
          en: "Cold Americano",
          uz: "Sovuq Americano"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cold_mocha: {
      id: "cold_mocha",
      price: 38000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Холодный Мокко",
          en: "Cold Mocha",
          uz: "Sovuq Mocha"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cold_spanish_latte: {
      id: "cold_spanish_latte",
      price: 40000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Холодный Испанский латте",
          en: "Cold Spanish Latte",
          uz: "Sovuq Ispan Latte"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    cold_matcha_latte: {
      id: "cold_matcha_latte",
      price: 40000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Холодный латте с матчей",
          en: "Cold Matcha Latte",
          uz: "Sovuq Matcha Latte"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    coca_cola: {
      id: "coca_cola",
      price: 20000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Coca Cola",
          en: "Coca Cola",
          uz: "Coca Cola"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    fanta: {
      id: "fanta",
      price: 20000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Fanta",
          en: "Fanta",
          uz: "Fanta"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    sprite: {
      id: "sprite",
      price: 20000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Sprite",
          en: "Sprite",
          uz: "Sprite"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    red_bull: {
      id: "red_bull",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Red Bull",
          en: "Red Bull",
          uz: "Red Bull"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    blanc_blue_025: {
      id: "blanc_blue_025",
      price: 15000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Blanc blue 0.25 (с газом/без газа)",
          en: "Blanc blue 0.25 (with/without gas)",
          uz: "Blanc blue 0.25 (gazli/gazsiz)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    blanc_blue_05: {
      id: "blanc_blue_05",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Blanc blue 0.5 (с газом/без газа)",
          en: "Blanc blue 0.5 (with/without gas)",
          uz: "Blanc blue 0.5 (gazli/gazsiz)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    turon_025: {
      id: "turon_025",
      price: 15000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Turon 0.25 (с газом/без газа)",
          en: "Turon 0.25 (with/without gas)",
          uz: "Turon 0.25 (gazli/gazsiz)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    turon_05: {
      id: "turon_05",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Turon 0.5 (с газом/без газа)",
          en: "Turon 0.5 (with/without gas)",
          uz: "Turon 0.5 (gazli/gazsiz)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    mojito: {
      id: "mojito",
      price: 41000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Мохито",
          en: "Mojito",
          uz: "Moxito"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    strawberry_mojito: {
      id: "strawberry_mojito",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Клубничный мохито (декантер)",
          en: "Strawberry Mojito (decanter)",
          uz: "Qulupnay moxito (dekanter)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    classic_mojito: {
      id: "classic_mojito",
      price: 41000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Классический мохито (декантер)",
          en: "Classic Mojito (decanter)",
          uz: "Klassik moxito (dekanter)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    red_bull_mojito: {
      id: "red_bull_mojito",
      price: 48000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Red Bull Мохито (декантер)",
          en: "Red Bull Mojito (decanter)",
          uz: "Red Bull moxito (dekanter)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    passionfruit_mojito: {
      id: "passionfruit_mojito",
      price: 45000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Мохито Маракуйя (декантер)",
          en: "Passionfruit Mojito (decanter)",
          uz: "Marakuyya moxito (dekanter)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    milkshakes: {
      id: "milkshakes",
      price: 38000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Молочные коктейли",
          en: "Milkshakes",
          uz: "Sutli kokteyllar"
        },
        desc: {
          ru: "Клубничный, Классический, Ириска, Буэно с арахисом",
          en: "Strawberry, Classic, Toffee, Bueno with Peanuts",
          uz: "Qulupnay, Klassik, Toffee, Bueno yeryong‘oqli"
        }
      }
    },
    smoothies: {
      id: "smoothies",
      price: 42000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Смузи",
          en: "Smoothies",
          uz: "Smoothilar"
        },
        desc: {
          ru: "Ягодный, Манго-маракуйя, Клубника и малина",
          en: "Berry, Mango-Passionfruit, Strawberry and Raspberry",
          uz: "Rezavorli, Mango-marakuyya, Qulupnay va malina"
        }
      }
    },
    lemonades: {
      id: "lemonades",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Лимонады",
          en: "Lemonades",
          uz: "Limonadlar"
        },
        desc: {
          ru: "Маракуйя-манго, Клубника с ананасом, Классический, Клубника-личи",
          en: "Passionfruit-Mango, Strawberry with Pineapple, Classic, Strawberry-Lychee",
          uz: "Marakuyya-mango, Qulupnay va ananas, Klassik, Qulupnay-lichi"
        }
      }
    },
    compote: {
      id: "compote",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Компот (декантер)",
          en: "Compote (decanter)",
          uz: "Kompot (dekanter)"
        },
        desc: {
          ru: "из разных фруктов, из сухофруктов, вишневый",
          en: "from various fruits, from dried fruits, cherry",
          uz: "turli mevalardan, quruq mevalardan, gilos"
        }
      }
    },
    ayran: {
      id: "ayran",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Айран (декантер)",
          en: "Ayran (decanter)",
          uz: "Ayron (dekanter)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Соки
    orange_juice: {
      id: "orange_juice",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Апельсиновый",
          en: "Orange Juice",
          uz: "Apelsin sharbati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    apple_juice: {
      id: "apple_juice",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Яблочный",
          en: "Apple Juice",
          uz: "Olma sharbati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    carrot_juice: {
      id: "carrot_juice",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Морковный",
          en: "Carrot Juice",
          uz: "Sabzi sharbati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    apple_carrot: {
      id: "apple_carrot",
      price: 28000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Яблочно-морковный",
          en: "Apple-Carrot Juice",
          uz: "Olma-sabzi sharbati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    apple_orange: {
      id: "apple_orange",
      price: 28000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Яблочно-апельсиновый",
          en: "Apple-Orange Juice",
          uz: "Olma-apelsin sharbati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    apple_orange_carrot: {
      id: "apple_orange_carrot",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Яблочно-апельсиново-морковный",
          en: "Apple-Orange-Carrot Juice",
          uz: "Olma-apelsin-sabzi sharbati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    grapefruit: {
      id: "grapefruit",
      price: 28000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Грейпфрутовый",
          en: "Grapefruit Juice",
          uz: "Greyfrut sharbati"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },

    // Чай
    leaf_tea_assam: {
      id: "leaf_tea_assam",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Ассам черный чай",
          en: "Assam Black Tea",
          uz: "Assam qora choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    leaf_tea_assam_lemon: {
      id: "leaf_tea_assam_lemon",
      price: 32000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Черный чай с лимоном Ассам",
          en: "Assam Black Tea with Lemon",
          uz: "Assam qora choy limon bilan"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    green_gunpowder: {
      id: "green_gunpowder",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Зеленый чай Gunpowder",
          en: "Green Tea Gunpowder",
          uz: "Yashil choy Gunpowder"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    green_jasmine: {
      id: "green_jasmine",
      price: 32000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Зеленый жасмин",
          en: "Green Jasmine Tea",
          uz: "Yashil jasmin choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    navvat: {
      id: "navvat",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Чай Навват",
          en: "Navvat Tea",
          uz: "Navvat choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    black_tea: {
      id: "black_tea",
      price: 15000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Черный чай",
          en: "Black Tea",
          uz: "Qora choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    black_tea_lemon: {
      id: "black_tea_lemon",
      price: 18000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Черный чай с лимоном",
          en: "Black Tea with Lemon",
          uz: "Qora choy limon bilan"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    green_tea: {
      id: "green_tea",
      price: 15000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Зеленый чай",
          en: "Green Tea",
          uz: "Yashil choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_hibiscus: {
      id: "special_hibiscus",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Гибискус с ягодами",
          en: "Hibiscus with Berries",
          uz: "Gibiskus va rezavorlar"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_strawberry: {
      id: "special_strawberry",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Клубника с апельсином",
          en: "Strawberry with Orange",
          uz: "Qulupnay va apelsin"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_bardak: {
      id: "special_bardak",
      price: 25000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Bardak tea (1 чашка)",
          en: "Bardak Tea (1 cup)",
          uz: "Bardak choy (1 chashka)"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_turkish: {
      id: "special_turkish",
      price: 30000,
      veg:
      true,
      image: "",
      i18n: {
        name: {
          ru: "Турецкий чай Bardak",
          en: "Turkish Bardak Tea",
          uz: "Turk Bardak choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_immune: {
      id: "special_immune",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Иммуно-бустер чай",
          en: "Immune-Booster Tea",
          uz: "Immunitet kuchaytiruvchi choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_sea_buckthorn: {
      id: "special_sea_buckthorn",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Облепиха с имбирем",
          en: "Sea Buckthorn with Ginger",
          uz: "Chaqalo‘t va zanjabil"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_anti_stress: {
      id: "special_anti_stress",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Антистресс",
          en: "Anti-Stress",
          uz: "Anti-stress"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_shirchoy: {
      id: "special_shirchoy",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Ширчой",
          en: "Shirchoy",
          uz: "Shirchoy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    special_moroccan: {
      id: "special_moroccan",
      price: 35000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Марокканский чай",
          en: "Moroccan Tea",
          uz: "Marokash choy"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
        curtis_summer: {
      id: "curtis_summer",
      merchant: "Curtis",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Summer Berries",
          en: "Summer Berries",
          uz: "Summer Berries"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    curtis_earl: {
      id: "curtis_earl",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Earl Grey",
          en: "Earl Grey",
          uz: "Earl Grey"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    curtis_hugo: {
      id: "curtis_hugo",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Hugo Cocktail",
          en: "Hugo Cocktail",
          uz: "Hugo Cocktail"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    curtis_mango: {
      id: "curtis_mango",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Delicate Mango",
          en: "Delicate Mango",
          uz: "Delicate Mango"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    },
    curtis_blueberries: {
      id: "curtis_blueberries",
      price: 30000,
      veg: true,
      image: "",
      i18n: {
        name: {
          ru: "Blueberries",
          en: "Blueberries",
          uz: "Blueberries"
        },
        desc: {
          ru: "",
          en: "",
          uz: ""
        }
      }
    }
  }
};

// Описания для блюд дня
const HERO_DESC_BY_ID = {
  ru: {
    lagman_uyghur: "Классический лагман на ручной лапше.",
    beef_kebab: "Сочные шашлыки с мангала.",
    kazan_kebab: "Казан‑кабаб — мясо и картофель в казане.",
    plov: "Традиционный узбекский плов с бараниной"
  },
  en: {
    lagman_uyghur: "Classic Uyghur lagman with hand‑pulled noodles.",
    beef_kebab: "Juicy kebabs from the grill.",
    kazan_kebab: "Kazan kebab — hearty meat & potatoes.",
    plov: "Traditional Uzbek plov with lamb"
  },
  uz: {
    lagman_uyghur: "Qo'l tortilgan lag'mon.",
    beef_kebab: "Shirador kaboblar.",
    kazan_kebab: "Qozon kabob — go'sht va kartoshka.",
    plov: "An'anaviy o'zbek oshi"
  }
};

// Функция для получения пути к изображению для героя
const HERO_IMG_SRC = id => MENU.items[id]?.image || {
  lagman_uyghur: "assets/lagman-uygurskiy.webp",
  beef_kebab: "assets/shashlik-mol_jaz.webp",
  kazan_kebab: "assets/kazan-kebab.webp",
  plov: "assets/Plov.webp"
}[id] || '';