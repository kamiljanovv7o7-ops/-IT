import type { ServiceId } from '../data/services';

export type Language = 'ky' | 'ru' | 'uz' | 'en';

export type PortfolioCategoryKey = 'all' | 'menu' | 'vizitka' | 'video' | 'website';

export interface LanguageOption {
  code: Language;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ky', label: 'Кыргызча' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: 'Ўзбекча' },
  { code: 'en', label: 'English' },
];

export interface TranslationContent {
  metaTitle: string;
  languageLabel: string;
  nav: {
    ariaLabel: string;
    mobileAriaLabel: string;
    openMenu: string;
    closeMenu: string;
    home: string;
    services: string;
    pricing: string;
    about: string;
    contact: string;
    orderCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewServices: string;
    contactUs: string;
    proof1: string;
    proof2: string;
    proof3: string;
    imageAlt: string;
    imageFallback: string;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    orderBtn: string;
    items: Record<
      ServiceId,
      {
        title: string;
        shortTitle: string;
        priceDisplay: string;
        unitLabel: string;
        perUnitNote: string;
        currencyLabel: string;
        description: string;
        deliverable: string;
      }
    >;
  };
  calculator: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabMenu: string;
    tabVizitka: string;
    tabBoth: string;
    menuQtyLabel: string;
    vizitkaQtyLabel: string;
    decreaseMenu: string;
    increaseMenu: string;
    decreaseVizitka: string;
    increaseVizitka: string;
    totalLabel: string;
    somCurrency: string;
    unitPcs: string;
    applyBtn: string;
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<
      'quality' | 'speed' | 'price' | 'partnership',
      {
        title: string;
        metric: string;
        description: string;
      }
    >;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabsAriaLabel: string;
    categories: Record<PortfolioCategoryKey, string>;
    viewDetails: string;
    closeModal: string;
    closeBtn: string;
    orderSimilarBtn: string;
    items: Record<
      string,
      {
        title: string;
        resultMetric: string;
        client: string;
        summary: string;
      }
    >;
  };
  orderForm: {
    eyebrow: string;
    title: string;
    subtitle: string;
    summaryHeading: string;
    qtyLabel: string;
    estimatedTotalLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    quantityLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    submitBtn: string;
    errName: string;
    errPhone: string;
    errQty: string;
    successTitle: string;
    successTextPrefix: string;
    successTextMiddle: string;
    successTextSuffix: string;
    summaryService: string;
    summaryQty: string;
    summaryTotal: string;
    summaryComment: string;
    newOrderBtn: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    phoneLabel: string;
    telegramLabel: string;
    instagramLabel: string;
    addressLabel: string;
    addressValue: string;
    addressAria: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationContent> = {
  ky: {
    metaTitle: 'Санарип IT — Бизнесиңиз үчүн IT чечимдер',
    languageLabel: 'Тилди тандоо',
    nav: {
      ariaLabel: 'Негизги навигация',
      mobileAriaLabel: 'Мобилдик меню',
      openMenu: 'Менюну ачуу',
      closeMenu: 'Менюну жабуу',
      home: 'Башкы бет',
      services: 'Кызматтар',
      pricing: 'Баалар',
      about: 'Биз жөнүндө',
      contact: 'Байланыш',
      orderCta: 'Буйрутма берүү',
    },
    hero: {
      eyebrow: 'Бишкек · Полиграфия, видео жана веб-иштеп чыгуу',
      title: 'Бизнесиңиз үчүн IT чечимдер',
      subtitle:
        'Кафе жана дүкөндөр үчүн сапаттуу меню менен визиткадан тартып, кардар алып келүүчү жарнамалык видеолорго жана заманбап веб-сайттарга чейин толук кызмат көрсөтөбүз.',
      viewServices: 'Кызматтарды көрүү',
      contactUs: 'Байланышуу',
      proof1: '120+ аткарылган долбоор',
      proof2: 'Меню 20 сом · Визитка 10 сом',
      proof3: '1–14 күн мөөнөт',
      imageAlt: 'Санарип IT студиясынын заманбап жумушчу мейкиндиги',
      imageFallback: 'Санарип IT студиясы',
    },
    servicesSection: {
      eyebrow: 'Кызматтар жана баалар',
      title: 'Бизнес үчүн так бааланган санариптик кызматтар',
      subtitle:
        'Басма материалдардан тартып видео жарнамага жана толук веб-сайтка чейин ачык-айкын тарифтер.',
      orderBtn: 'Буйрутма берүү',
      items: {
        menu: {
          title: 'Меню',
          shortTitle: 'Меню (1 даанасы 20 сом)',
          priceDisplay: '20 сом',
          unitLabel: 'даана',
          perUnitNote: '1 даанасы',
          currencyLabel: 'сом',
          description:
            'Кафе, ресторан жана тез тамактануучу жайлар үчүн окууга жеңил, заманбап дизайндагы басма меню даярдоо.',
          deliverable: 'Дизайн макет + басмага даярдоо',
        },
        vizitka: {
          title: 'Визитка',
          shortTitle: 'Визитка (1 даанасы 10 сом)',
          priceDisplay: '10 сом',
          unitLabel: 'даана',
          perUnitNote: '1 даанасы',
          currencyLabel: 'сом',
          description:
            'Кардарлардын эсинде калуучу тыкан типографиялык түзүлүштөгү бир же эки тараптуу бизнес визиткалар.',
          deliverable: 'Эки тараптуу дизайн + тыгыз кагаз',
        },
        video: {
          title: 'Рекламалык видео',
          shortTitle: 'Рекламалык видео (500 сом)',
          priceDisplay: '500 сом',
          unitLabel: 'ролик',
          perUnitNote: '1 ролик',
          currencyLabel: 'сом',
          description:
            'Instagram, TikTok жана сайттар үчүн товар же кызматты ачып берүүчү динамикалуу жарнамалык видеоролик.',
          deliverable: 'Тартуу / монтаж + үн коштоо',
        },
        website: {
          title: 'Сайт жасоо',
          shortTitle: 'Сайт жасоо (450 доллар)',
          priceDisplay: '450 доллар',
          unitLabel: 'долбоор',
          perUnitNote: 'толук сайт',
          currencyLabel: 'доллар',
          description:
            'Телефонго жана компьютерге толук адаптацияланган, тез жүктөлүүчү заманбап корпоративдик же сатуучу веб-сайт.',
          deliverable: 'Адаптив дизайн + домен/хостинг туташтыруу',
        },
      },
    },
    calculator: {
      eyebrow: 'Автоматтык баа калькулятору',
      title: 'Меню жана визитка баасын дароо эсептеңиз',
      subtitle:
        'Керектүү санын жазыңыз же даяр баскычтарды тандаңыз — жалпы сумма автоматтык түрдө эсептелет.',
      tabMenu: 'Меню (20 сом)',
      tabVizitka: 'Визитка (10 сом)',
      tabBoth: 'Экөө тең',
      menuQtyLabel: 'Меню саны (1 даанасы — 20 сом)',
      vizitkaQtyLabel: 'Визитка саны (1 даанасы — 10 сом)',
      decreaseMenu: 'Меню санын азайтуу',
      increaseMenu: 'Меню санын көбөйтүү',
      decreaseVizitka: 'Визитка санын азайтуу',
      increaseVizitka: 'Визитка санын көбөйтүү',
      totalLabel: 'Эсептелген жалпы сумма',
      somCurrency: 'сом',
      unitPcs: 'даана',
      applyBtn: 'Ушул саны менен буйрутма берүү',
    },
    about: {
      eyebrow: 'Биздин артыкчылыктар',
      title: 'Эмне үчүн бизди тандашат?',
      subtitle:
        'Чакан бизнестен ири компанияларга чейин так мөөнөт, ачык баа жана узак мөөнөттүү натыйжа беребиз.',
      items: {
        quality: {
          title: 'Сапат',
          metric: 'Стандартка так шайкеш',
          description:
            'Ар бир меню, визитка, видео жана веб-сайт заманбап визуалдык талаптарга ылайык кылдат текшерүүдөн өтөт.',
        },
        speed: {
          title: 'Ылдамдык',
          metric: '1–14 күн ичинде даяр',
          description:
            'Полиграфиялык буйрутмалар 1–2 күндө, видеороликтер 2–3 күндө, ал эми толук веб-сайттар 7–14 күндө тапшырылат.',
        },
        price: {
          title: 'Ыңгайлуу баа',
          metric: 'Жашыруун төлөмдөр жок',
          description:
            'Баалар алдын ала белгилүү: меню 20 сом, визитка 10 сом. Калькулятор аркылуу чыгымды дароо эсептей аласыз.',
        },
        partnership: {
          title: 'Ишенимдүү өнөктөштүк',
          metric: 'Долбоордон кийинки колдоо',
          description:
            'Иш тапшырылгандан кийин да маалымат жаңыртуу, оңдоо киргизүү жана техникалык кеңеш берүү жагынан жаныңызда болобуз.',
        },
      },
    },
    portfolio: {
      eyebrow: 'Портфолио',
      title: 'Аткарылган иштердин үлгүлөрү',
      subtitle:
        'Реалдуу кардарлар үчүн иштелип чыккан 6 долбоор. Толук маалымат көрүү үчүн каалаган үлгүнү басыңыз.',
      tabsAriaLabel: 'Долбоор түрлөрү',
      categories: {
        all: 'Баары',
        menu: 'Меню',
        vizitka: 'Визитка',
        video: 'Видео',
        website: 'Веб-сайт',
      },
      viewDetails: 'Толугураак көрүү',
      closeModal: 'Терезени жабуу',
      closeBtn: 'Жабуу',
      orderSimilarBtn: 'Ушундай буйрутма берүү',
      items: {
        p1: {
          title: 'Bistro Arslan — Ресторан менюсу',
          resultMetric: '320 даана басылды',
          client: 'Bistro Arslan, Бишкек',
          summary:
            'Тамак-аш бөлүмдөрү так бөлүнгөн, оңой окулуучу шрифттери бар 12 беттик фирмалык басма меню иштелип чыкты.',
        },
        p2: {
          title: 'Aether Advisory — Премиум визитка',
          resultMetric: '1 000 даана даярдалды',
          client: 'Aether Consulting',
          summary:
            'Күңүрт кара тыгыз картонго жашыл фольга басылган, компаниянын статусун баса белгилеген корпоративдик визитка.',
        },
        p3: {
          title: 'Harmony Brand — Жарнамалык ролик',
          resultMetric: '45 000+ көрүү',
          client: 'Harmony Studio',
          summary:
            'Социалдык тармактар үчүн динамикалуу монтаж, түс коррекциясы жана таза диктордук үн коштоосу менен 30 секунддук видео.',
        },
        p4: {
          title: 'Quantum Dynamics — Корпоративдик сайт',
          resultMetric: '+65% онлайн өтүнмө',
          client: 'Quantum Logistics KG',
          summary:
            'Кызматтардын каталогу, эсеп калькулятору жана ыкчам кайтарым байланыш формасы бар адаптив корпоративдик платформа.',
        },
        p5: {
          title: 'Foundry Cafe — Стол үстүндөгү меню',
          resultMetric: '150 даана комплекти',
          client: 'Foundry Coffee House',
          summary:
            'Кофекананын сезонуна ылайыкталган, суу өткөрбөгөн ламинацияланган тейбл-тент жана негизги суусундуктар менюсу.',
        },
        p6: {
          title: 'Arket Store — Интернет-дүкөн',
          resultMetric: 'Мобилдик + ПК версия',
          client: 'Arket Retail',
          summary:
            'Товарларды чыпкалоо, себет жана WhatsApp/телефон аркылуу ыкчам буюртма кабыл алуу функциясы бар онлайн-дүкөн.',
        },
      },
    },
    orderForm: {
      eyebrow: 'Онлайн өтүнмө',
      title: 'Буйрутма берүү формасы',
      subtitle:
        'Керектүү кызматты жана санын тандап, байланыш маалыматыңызды калтырыңыз. Биздин адис 15 мүнөт ичинде сиз менен байланышат.',
      summaryHeading: 'Тандалган кызмат боюнча эсеп',
      qtyLabel: 'Саны:',
      estimatedTotalLabel: 'Болжолдуу баа:',
      nameLabel: 'Аты-жөнүңүз',
      namePlaceholder: 'Мисалы: Азамат Алиев',
      phoneLabel: 'Телефон номериңиз',
      phonePlaceholder: '0 559 146 555',
      serviceLabel: 'Кызмат түрү',
      quantityLabel: 'Саны',
      commentLabel: 'Кошумча комментарий',
      commentPlaceholder: 'Дизайн боюнча каалоолор, мөөнөт же кошумча суроолор...',
      submitBtn: 'Буйрутманы жөнөтүү',
      errName: 'Сураныч, аты-жөнүңүздү толук жазыңыз.',
      errPhone:
        'Сураныч, байланышуу үчүн туура телефон номерин жазыңыз (мисалы: 0 559 146 555).',
      errQty: 'Кызмат саны 1ден кем болбошу керек.',
      successTitle: 'Буйрутмаңыз кабыл алынды',
      successTextPrefix: 'Рахмат,',
      successTextMiddle: '! Сиздин өтүнмө ийгиликтүү катталды. Жакын арада',
      successTextSuffix: 'номерине байланышабыз.',
      summaryService: 'Кызмат түрү:',
      summaryQty: 'Саны:',
      summaryTotal: 'Болжолдуу баа:',
      summaryComment: 'Комментарий:',
      newOrderBtn: 'Жаңы буйрутма берүү',
    },
    contact: {
      eyebrow: 'Байланыш',
      title: 'Биз менен түз байланышыңыз',
      subtitle:
        'Долбоор боюнча кеңеш алуу же тез эсептөө үчүн күн сайын саат 09:00дөн 20:00гө чейин байланыштабыз.',
      phoneLabel: 'Телефон',
      telegramLabel: 'Telegram',
      instagramLabel: 'Instagram',
      addressLabel: 'Дарек · Google Maps',
      addressValue: 'Фучика көчөсү, 18',
      addressAria: 'Фучика көчөсү, 18 — Google Картадан ачуу',
      copyright: '© 2026 Санарип IT. Бардык укуктар корголгон.',
    },
  },

  ru: {
    metaTitle: 'Санарип IT — IT-решения для вашего бизнеса',
    languageLabel: 'Выбор языка',
    nav: {
      ariaLabel: 'Основная навигация',
      mobileAriaLabel: 'Мобильное меню',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      home: 'Главная',
      services: 'Услуги',
      pricing: 'Цены',
      about: 'О нас',
      contact: 'Контакты',
      orderCta: 'Заказать',
    },
    hero: {
      eyebrow: 'Бишкек · Полиграфия, видео и веб-разработка',
      title: 'IT-решения для вашего бизнеса',
      subtitle:
        'От стильных меню и визиток для кафе и магазинов до продающих рекламных роликов и современных веб-сайтов под ключ.',
      viewServices: 'Смотреть услуги',
      contactUs: 'Связаться',
      proof1: '120+ выполненных проектов',
      proof2: 'Меню 20 сом · Визитка 10 сом',
      proof3: 'Срок 1–14 дней',
      imageAlt: 'Современное рабочее пространство студии Санарип IT',
      imageFallback: 'Студия Санарип IT',
    },
    servicesSection: {
      eyebrow: 'Услуги и цены',
      title: 'Прозрачные тарифы на цифровые услуги для бизнеса',
      subtitle:
        'Фиксированные и понятные цены — от печатной полиграфии до рекламного видео и разработки сайта.',
      orderBtn: 'Заказать',
      items: {
        menu: {
          title: 'Меню',
          shortTitle: 'Меню (1 шт — 20 сом)',
          priceDisplay: '20 сом',
          unitLabel: 'шт.',
          perUnitNote: 'за 1 шт.',
          currencyLabel: 'сом',
          description:
            'Разработка и печать аккуратных, легко читаемых меню для кафе, ресторанов и заведений быстрого питания.',
          deliverable: 'Дизайн-макет + подготовка к печати',
        },
        vizitka: {
          title: 'Визитка',
          shortTitle: 'Визитка (1 шт — 10 сом)',
          priceDisplay: '10 сом',
          unitLabel: 'шт.',
          perUnitNote: 'за 1 шт.',
          currencyLabel: 'сом',
          description:
            'Одно- и двусторонние корпоративные визитки с выверенной типографикой, которые запоминаются клиентам.',
          deliverable: 'Двусторонний дизайн + плотная бумага',
        },
        video: {
          title: 'Рекламное видео',
          shortTitle: 'Рекламное видео (500 сом)',
          priceDisplay: '500 сом',
          unitLabel: 'ролик',
          perUnitNote: 'за 1 ролик',
          currencyLabel: 'сом',
          description:
            'Динамичный рекламный видеоролик для Instagram, TikTok и сайта, раскрывающий преимущества вашего продукта.',
          deliverable: 'Съёмка / монтаж + озвучка',
        },
        website: {
          title: 'Создание сайта',
          shortTitle: 'Создание сайта (450 долларов)',
          priceDisplay: '450 $',
          unitLabel: 'проект',
          perUnitNote: 'под ключ',
          currencyLabel: '$',
          description:
            'Быстрый корпоративный или продающий веб-сайт с полной адаптацией под смартфоны и компьютеры.',
          deliverable: 'Адаптивный дизайн + домен и хостинг',
        },
      },
    },
    calculator: {
      eyebrow: 'Автоматический калькулятор',
      title: 'Рассчитайте стоимость меню и визиток сразу',
      subtitle:
        'Введите нужное количество или выберите готовый тираж — итоговая сумма обновится автоматически.',
      tabMenu: 'Меню (20 сом)',
      tabVizitka: 'Визитка (10 сом)',
      tabBoth: 'Оба варианта',
      menuQtyLabel: 'Количество меню (1 шт. — 20 сом)',
      vizitkaQtyLabel: 'Количество визиток (1 шт. — 10 сом)',
      decreaseMenu: 'Уменьшить количество меню',
      increaseMenu: 'Увеличить количество меню',
      decreaseVizitka: 'Уменьшить количество визиток',
      increaseVizitka: 'Увеличить количество визиток',
      totalLabel: 'Рассчитанная сумма',
      somCurrency: 'сом',
      unitPcs: 'шт.',
      applyBtn: 'Заказать с этим количеством',
    },
    about: {
      eyebrow: 'Наши преимущества',
      title: 'Почему выбирают нас?',
      subtitle:
        'Работаем с малым и средним бизнесом, обеспечивая точные сроки, понятную смету и стабильный результат.',
      items: {
        quality: {
          title: 'Качество',
          metric: 'Строгий контроль стандартов',
          description:
            'Каждое меню, визитка, видеоролик и веб-сайт проходят проверку по современным требованиям дизайна и печати.',
        },
        speed: {
          title: 'Скорость',
          metric: 'Готовность за 1–14 дней',
          description:
            'Полиграфия выполняется за 1–2 дня, рекламные ролики за 2–3 дня, а полноценные сайты за 7–14 дней.',
        },
        price: {
          title: 'Выгодная цена',
          metric: 'Без скрытых доплат',
          description:
            'Цены фиксированы заранее: меню 20 сом, визитка 10 сом. Вы сразу видите точную стоимость в калькуляторе.',
        },
        partnership: {
          title: 'Надёжное партнёрство',
          metric: 'Поддержка после запуска',
          description:
            'Остаёмся на связи и после сдачи проекта: помогаем с обновлениями, правками и технической поддержкой.',
        },
      },
    },
    portfolio: {
      eyebrow: 'Портфолио',
      title: 'Примеры выполненных работ',
      subtitle:
        '6 реальных проектов для наших клиентов. Нажмите на любую карточку, чтобы посмотреть детали.',
      tabsAriaLabel: 'Категории проектов',
      categories: {
        all: 'Все',
        menu: 'Меню',
        vizitka: 'Визитка',
        video: 'Видео',
        website: 'Веб-сайт',
      },
      viewDetails: 'Подробнее',
      closeModal: 'Закрыть окно',
      closeBtn: 'Закрыть',
      orderSimilarBtn: 'Заказать похожий проект',
      items: {
        p1: {
          title: 'Bistro Arslan — Меню для ресторана',
          resultMetric: 'Отпечатано 320 шт.',
          client: 'Bistro Arslan, Бишкек',
          summary:
            '12-страничное фирменное печатное меню с чёткой структурой блюд и удобной читаемой типографикой.',
        },
        p2: {
          title: 'Aether Advisory — Премиум-визитки',
          resultMetric: 'Тираж 1 000 шт.',
          client: 'Aether Consulting',
          summary:
            'Корпоративные визитки на плотном матовом чёрном картоне с изумрудным тиснением фольгой.',
        },
        p3: {
          title: 'Harmony Brand — Рекламный ролик',
          resultMetric: '45 000+ просмотров',
          client: 'Harmony Studio',
          summary:
            '30-секундный динамичный ролик для соцсетей с цветокоррекцией, графикой и чистой дикторской озвучкой.',
        },
        p4: {
          title: 'Quantum Dynamics — Корпоративный сайт',
          resultMetric: '+65% онлайн-заявок',
          client: 'Quantum Logistics KG',
          summary:
            'Адаптивный корпоративный сайт с каталогом услуг, калькулятором расчёта и формой быстрой заявки.',
        },
        p5: {
          title: 'Foundry Cafe — Настольное меню',
          resultMetric: 'Комплект 150 шт.',
          client: 'Foundry Coffee House',
          summary:
            'Сезонная карта напитков и влагостойкие настольные тейбл-тенты, адаптированные под интерьер кофейни.',
        },
        p6: {
          title: 'Arket Store — Интернет-магазин',
          resultMetric: 'Мобильная + ПК версия',
          client: 'Arket Retail',
          summary:
            'Онлайн-магазин с фильтрацией товаров, корзиной и быстрым оформлением заказа по телефону и WhatsApp.',
        },
      },
    },
    orderForm: {
      eyebrow: 'Онлайн-заявка',
      title: 'Форма заказа',
      subtitle:
        'Выберите нужную услугу и количество, оставьте контакты — наш специалист свяжется с вами в течение 15 минут.',
      summaryHeading: 'Расчёт выбранной услуги',
      qtyLabel: 'Количество:',
      estimatedTotalLabel: 'Итоговая стоимость:',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Например: Азамат Алиев',
      phoneLabel: 'Номер телефона',
      phonePlaceholder: '0 559 146 555',
      serviceLabel: 'Тип услуги',
      quantityLabel: 'Количество',
      commentLabel: 'Комментарий',
      commentPlaceholder: 'Пожелания по дизайну, срокам или дополнительные вопросы...',
      submitBtn: 'Отправить заказ',
      errName: 'Пожалуйста, введите ваше имя полностью.',
      errPhone:
        'Пожалуйста, укажите корректный номер телефона (например: 0 559 146 555).',
      errQty: 'Количество не может быть меньше 1.',
      successTitle: 'Ваш заказ принят',
      successTextPrefix: 'Спасибо,',
      successTextMiddle: '! Ваша заявка успешно зарегистрирована. В ближайшее время свяжемся по номеру',
      successTextSuffix: '.',
      summaryService: 'Услуга:',
      summaryQty: 'Количество:',
      summaryTotal: 'Итого:',
      summaryComment: 'Комментарий:',
      newOrderBtn: 'Оформить новый заказ',
    },
    contact: {
      eyebrow: 'Контакты',
      title: 'Свяжитесь с нами напрямую',
      subtitle:
        'Ежедневно с 09:00 до 20:00 на связи для консультаций и быстрого расчёта стоимости вашего проекта.',
      phoneLabel: 'Телефон',
      telegramLabel: 'Telegram',
      instagramLabel: 'Instagram',
      addressLabel: 'Адрес · Google Maps',
      addressValue: 'ул. Фучика, 18',
      addressAria: 'ул. Фучика, 18 — открыть в Google Картах',
      copyright: '© 2026 Санарип IT. Все права защищены.',
    },
  },

  uz: {
    metaTitle: 'Санарип IT — Бизнесингиз учун IT ечимлар',
    languageLabel: 'Тилни танлаш',
    nav: {
      ariaLabel: 'Асосий навигация',
      mobileAriaLabel: 'Мобил меню',
      openMenu: 'Менюни очиш',
      closeMenu: 'Менюни ёпиш',
      home: 'Бош саҳифа',
      services: 'Хизматлар',
      pricing: 'Нархлар',
      about: 'Биз ҳақимизда',
      contact: 'Алоқа',
      orderCta: 'Буюртма бериш',
    },
    hero: {
      eyebrow: 'Бишкек · Полиграфия, видео ва веб-дастурлаш',
      title: 'Бизнесингиз учун IT ечимлар',
      subtitle:
        'Кафе ва дўконлар учун сифатли меню ва визиткалардан тортиб, мижоз жалб қилувчи реклама роликлари ва замонавий веб-сайтларгача тўлиқ хизмат кўрсатамиз.',
      viewServices: 'Хизматларни кўриш',
      contactUs: 'Боғланиш',
      proof1: '120+ бажарилган лойиҳа',
      proof2: 'Меню 20 сом · Визитка 10 сом',
      proof3: 'Муддат 1–14 кун',
      imageAlt: 'Санарип IT студиясининг замонавий иш муҳити',
      imageFallback: 'Санарип IT студияси',
    },
    servicesSection: {
      eyebrow: 'Хизматлар ва нархлар',
      title: 'Бизнес учун аниқ нархланган рақамли хизматлар',
      subtitle:
        'Босма маҳсулотлардан тортиб реклама видеоси ва тайёр веб-сайтгача очиқ-ойдин тарифлар.',
      orderBtn: 'Буюртма бериш',
      items: {
        menu: {
          title: 'Меню',
          shortTitle: 'Меню (1 донаси 20 сом)',
          priceDisplay: '20 сом',
          unitLabel: 'дона',
          perUnitNote: '1 донаси',
          currencyLabel: 'сом',
          description:
            'Кафе, ресторан ва тез тамаддихоналар учун ўқишга қулай, замонавий дизайндаги босма меню тайёрлаш.',
          deliverable: 'Дизайн макет + чоп этишга тайёрлаш',
        },
        vizitka: {
          title: 'Визитка',
          shortTitle: 'Визитка (1 донаси 10 сом)',
          priceDisplay: '10 сом',
          unitLabel: 'дона',
          perUnitNote: '1 донаси',
          currencyLabel: 'сом',
          description:
            'Мижозларда яхши таассурот қолдирувчи тартибли дизайндаги бир ёки икки томонлама бизнес визиткалар.',
          deliverable: 'Икки томонлама дизайн + қалин қоғоз',
        },
        video: {
          title: 'Реклама видеоси',
          shortTitle: 'Реклама видеоси (500 сом)',
          priceDisplay: '500 сом',
          unitLabel: 'ролик',
          perUnitNote: '1 ролик',
          currencyLabel: 'сом',
          description:
            'Instagram, TikTok ва сайтлар учун маҳсулот ёки хизматни танитувчи динамик реклама видеоролиги.',
          deliverable: 'Тасвирга олиш / монтаж + овозлаштириш',
        },
        website: {
          title: 'Сайт ясаш',
          shortTitle: 'Сайт ясаш (450 доллар)',
          priceDisplay: '450 доллар',
          unitLabel: 'лойиҳа',
          perUnitNote: 'тўлиқ сайт',
          currencyLabel: 'доллар',
          description:
            'Телефон ва компьютерга тўлиқ мослашган, тез юкланадиган замонавий корпоратив ёки савдо веб-сайти.',
          deliverable: 'Адаптив дизайн + домен/хостинг улаш',
        },
      },
    },
    calculator: {
      eyebrow: 'Автоматик нарх калькулятори',
      title: 'Меню ва визитка нархини дарҳол ҳисобланг',
      subtitle:
        'Керакли миқдорни киритинг ёки тайёр тугмаларни танланг — умумий сумма автоматик ҳисобланади.',
      tabMenu: 'Меню (20 сом)',
      tabVizitka: 'Визитка (10 сом)',
      tabBoth: 'Иккаласи ҳам',
      menuQtyLabel: 'Меню сони (1 донаси — 20 сом)',
      vizitkaQtyLabel: 'Визитка сони (1 донаси — 10 сом)',
      decreaseMenu: 'Меню сонини камайтириш',
      increaseMenu: 'Меню сонини ошириш',
      decreaseVizitka: 'Визитка сонини камайтириш',
      increaseVizitka: 'Визитка сонини ошириш',
      totalLabel: 'Ҳисобланган умумий сумма',
      somCurrency: 'сом',
      unitPcs: 'дона',
      applyBtn: 'Ушбу миқдор билан буюртма бериш',
    },
    about: {
      eyebrow: 'Бизнинг афзалликларимиз',
      title: 'Нега бизни танлашади?',
      subtitle:
        'Кичик бизнесдан йирик компанияларгача аниқ муддат, шаффоф нарх ва барқарор натижа тақдим этамиз.',
      items: {
        quality: {
          title: 'Сифат',
          metric: 'Стандартларга тўлиқ мос',
          description:
            'Ҳар бир меню, визитка, видео ва веб-сайт замонавий дизайн ва чоп этиш талаблари асосида текширувдан ўтади.',
        },
        speed: {
          title: 'Тезкорлик',
          metric: '1–14 кун ичида тайёр',
          description:
            'Полиграфия буюртмалари 1–2 кунда, реклама роликлари 2–3 кунда, тўлиқ веб-сайтлар эса 7–14 кунда топширилади.',
        },
        price: {
          title: 'Қулай нарх',
          metric: 'Яширин тўловларсиз',
          description:
            'Нархлар олдиндан белгиланган: меню 20 сом, визитка 10 сом. Харажатни калькуляторда дарҳол кўришингиз мумкин.',
        },
        partnership: {
          title: 'Ишончли ҳамкорлик',
          metric: 'Лойиҳадан кейинги қўллаб-қувватлаш',
          description:
            'Иш топширилгандан сўнг ҳам маълумотларни янгилаш, тузатиш киритиш ва техник маслаҳат беришда ёрдам берамиз.',
        },
      },
    },
    portfolio: {
      eyebrow: 'Портфолио',
      title: 'Бажарилган ишлар намуналари',
      subtitle:
        'Мижозларимиз учун тайёрланган 6 та лойиҳа. Тўлиқ маълумот олиш учун исталган намунани босинг.',
      tabsAriaLabel: 'Лойиҳа турлари',
      categories: {
        all: 'Барчаси',
        menu: 'Меню',
        vizitka: 'Визитка',
        video: 'Видео',
        website: 'Веб-сайт',
      },
      viewDetails: 'Батафсил кўриш',
      closeModal: 'Ойнани ёпиш',
      closeBtn: 'Ёпиш',
      orderSimilarBtn: 'Шунга ўхшаш буюртма бериш',
      items: {
        p1: {
          title: 'Bistro Arslan — Ресторан менюси',
          resultMetric: '320 дона чоп этилди',
          client: 'Bistro Arslan, Бишкек',
          summary:
            'Таомлар бўлимлари аниқ ажратилган, ўқишга қулай шрифтларга эга 12 саҳифали фирмавий босма меню ишлаб чиқилди.',
        },
        p2: {
          title: 'Aether Advisory — Премиум визитка',
          resultMetric: '1 000 дона тайёрланди',
          client: 'Aether Consulting',
          summary:
            'Қора матовый қалин картонга яшил фольга босилган, компания нуфузини кўрсатувчи корпоратив визитка.',
        },
        p3: {
          title: 'Harmony Brand — Реклама ролиги',
          resultMetric: '45 000+ кўриш',
          client: 'Harmony Studio',
          summary:
            'Ижтимоий тармоқлар учун динамик монтаж, ранг коррекцияси ва тиниқ дикторлик овози билан 30 сониялик видео.',
        },
        p4: {
          title: 'Quantum Dynamics — Корпоратив сайт',
          resultMetric: '+65% онлайн мурожаат',
          client: 'Quantum Logistics KG',
          summary:
            'Хизматлар каталоги, нарх калькулятори ва тезкор алоқа формасига эга адаптив корпоратив платформа.',
        },
        p5: {
          title: 'Foundry Cafe — Стол усти менюси',
          resultMetric: '150 дона тўплам',
          client: 'Foundry Coffee House',
          summary:
            'Қаҳвахона мавсумига мослаштирилган, сув ўтказмайдиган ламинацияли тейбл-тент ва асосий ичимликлар менюси.',
        },
        p6: {
          title: 'Arket Store — Интернет-дўкон',
          resultMetric: 'Мобил + ПК версия',
          client: 'Arket Retail',
          summary:
            'Маҳсулотларни саралаш, сават ва телефон/WhatsApp орқали тезкор буюртма қабул қилиш имкониятига эга онлайн-дўкон.',
        },
      },
    },
    orderForm: {
      eyebrow: 'Онлайн ариза',
      title: 'Буюртма бериш формаси',
      subtitle:
        'Керакли хизмат ва миқдорни танлаб, алоқа маълумотларингизни қолдиринг. Мутахассисимиз 15 дақиқа ичида сиз билан боғланади.',
      summaryHeading: 'Танланган хизмат бўйича ҳисоб',
      qtyLabel: 'Миқдор:',
      estimatedTotalLabel: 'Тахминий нарх:',
      nameLabel: 'Исмингиз',
      namePlaceholder: 'Масалан: Азамат Алиев',
      phoneLabel: 'Телефон рақамингиз',
      phonePlaceholder: '0 559 146 555',
      serviceLabel: 'Хизмат тури',
      quantityLabel: 'Миқдор',
      commentLabel: 'Изоҳ',
      commentPlaceholder: 'Дизайн бўйича истаклар, муддат ёки қўшимча саволлар...',
      submitBtn: 'Буюртмани юбориш',
      errName: 'Илтимос, исмингизни тўлиқ киритинг.',
      errPhone:
        'Илтимос, боғланиш учун тўғри телефон рақамини киритинг (масалан: 0 559 146 555).',
      errQty: 'Хизмат миқдори 1 дан кам бўлмаслиги керак.',
      successTitle: 'Буюртмангиз қабул қилинди',
      successTextPrefix: 'Раҳмат,',
      successTextMiddle: '! Сизнинг мурожаатингиз муваффақиятли рўйхатга олинди. Тез орада',
      successTextSuffix: 'рақамига қўнғироқ қиламиз.',
      summaryService: 'Хизмат тури:',
      summaryQty: 'Миқдор:',
      summaryTotal: 'Тахминий нарх:',
      summaryComment: 'Изоҳ:',
      newOrderBtn: 'Янги буюртма бериш',
    },
    contact: {
      eyebrow: 'Алоқа',
      title: 'Биз билан тўғридан-тўғри боғланинг',
      subtitle:
        'Лойиҳа бўйича маслаҳат олиш ёки тезкор ҳисоб-китоб учун ҳар куни соат 09:00 дан 20:00 гача алоқадамиз.',
      phoneLabel: 'Телефон',
      telegramLabel: 'Telegram',
      instagramLabel: 'Instagram',
      addressLabel: 'Манзил · Google Maps',
      addressValue: 'Фучика кўчаси, 18',
      addressAria: 'Фучика кўчаси, 18 — Google Харитада очиш',
      copyright: '© 2026 Санарип IT. Барча ҳуқуқлар ҳимояланган.',
    },
  },

  en: {
    metaTitle: 'Sanarip IT — IT Solutions for Your Business',
    languageLabel: 'Select language',
    nav: {
      ariaLabel: 'Primary navigation',
      mobileAriaLabel: 'Mobile menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      home: 'Home',
      services: 'Services',
      pricing: 'Pricing',
      about: 'About Us',
      contact: 'Contact',
      orderCta: 'Order Now',
    },
    hero: {
      eyebrow: 'Bishkek · Print Design, Video & Web Development',
      title: 'IT Solutions for Your Business',
      subtitle:
        'From crisp printed menus and business cards for cafes and retail stores to high-converting promo videos and responsive modern websites.',
      viewServices: 'View Services',
      contactUs: 'Contact Us',
      proof1: '120+ completed projects',
      proof2: 'Menu 20 KGS · Card 10 KGS',
      proof3: '1–14 days delivery',
      imageAlt: 'Modern digital workspace at Sanarip IT studio',
      imageFallback: 'Sanarip IT Studio',
    },
    servicesSection: {
      eyebrow: 'Services & Pricing',
      title: 'Transparent Digital Services for Growing Businesses',
      subtitle:
        'Clear, upfront pricing across print materials, commercial video production, and full-cycle web development.',
      orderBtn: 'Order Now',
      items: {
        menu: {
          title: 'Menu Design',
          shortTitle: 'Menu (20 KGS per piece)',
          priceDisplay: '20 KGS',
          unitLabel: 'pcs',
          perUnitNote: 'per piece',
          currencyLabel: 'KGS',
          description:
            'Clean, easy-to-read printed menu layouts tailored for cafes, restaurants, and quick-service venues.',
          deliverable: 'Layout design + print-ready files',
        },
        vizitka: {
          title: 'Business Card',
          shortTitle: 'Business Card (10 KGS per piece)',
          priceDisplay: '10 KGS',
          unitLabel: 'pcs',
          perUnitNote: 'per piece',
          currencyLabel: 'KGS',
          description:
            'Single or double-sided corporate business cards with sharp typography that leaves a lasting impression.',
          deliverable: 'Two-sided design + heavy stock',
        },
        video: {
          title: 'Promo Video',
          shortTitle: 'Promo Video (500 KGS)',
          priceDisplay: '500 KGS',
          unitLabel: 'video',
          perUnitNote: 'per video',
          currencyLabel: 'KGS',
          description:
            'Dynamic promotional video clips for Instagram, TikTok, and landing pages highlighting your products or services.',
          deliverable: 'Filming / editing + voiceover',
        },
        website: {
          title: 'Website Creation',
          shortTitle: 'Website Creation ($450)',
          priceDisplay: '$450',
          unitLabel: 'project',
          perUnitNote: 'full website',
          currencyLabel: 'USD',
          description:
            'Fast-loading corporate or e-commerce websites fully responsive on both mobile phones and desktop monitors.',
          deliverable: 'Responsive UI + domain & hosting setup',
        },
      },
    },
    calculator: {
      eyebrow: 'Instant Price Calculator',
      title: 'Calculate Menu & Business Card Costs Instantly',
      subtitle:
        'Enter your quantity or pick a preset batch size — your total updates automatically in real time.',
      tabMenu: 'Menu (20 KGS)',
      tabVizitka: 'Business Card (10 KGS)',
      tabBoth: 'Both',
      menuQtyLabel: 'Menu quantity (1 pc — 20 KGS)',
      vizitkaQtyLabel: 'Business card quantity (1 pc — 10 KGS)',
      decreaseMenu: 'Decrease menu quantity',
      increaseMenu: 'Increase menu quantity',
      decreaseVizitka: 'Decrease business card quantity',
      increaseVizitka: 'Increase business card quantity',
      totalLabel: 'Estimated total',
      somCurrency: 'KGS',
      unitPcs: 'pcs',
      applyBtn: 'Order With This Quantity',
    },
    about: {
      eyebrow: 'Why Choose Us',
      title: 'Built for Reliability, Speed, and Clarity',
      subtitle:
        'Helping small businesses and growing enterprises launch with predictable timelines, fair pricing, and ongoing support.',
      items: {
        quality: {
          title: 'Quality',
          metric: 'Strict design & print standards',
          description:
            'Every menu, business card, promo video, and website undergoes thorough visual and technical review before delivery.',
        },
        speed: {
          title: 'Speed',
          metric: 'Ready in 1–14 days',
          description:
            'Print orders ship in 1–2 days, promotional videos in 2–3 days, and complete custom websites within 7–14 days.',
        },
        price: {
          title: 'Fair Pricing',
          metric: 'Zero hidden fees',
          description:
            'Rates are fixed upfront: 20 KGS per menu and 10 KGS per card. Calculate your exact spend immediately.',
        },
        partnership: {
          title: 'Reliable Partnership',
          metric: 'Post-launch support',
          description:
            'We stay available after project handover for content updates, quick edits, and ongoing technical guidance.',
        },
      },
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Selected Work Samples',
      subtitle:
        '6 client projects across print, video, and web. Click any card to inspect project details.',
      tabsAriaLabel: 'Project categories',
      categories: {
        all: 'All',
        menu: 'Menu',
        vizitka: 'Business Card',
        video: 'Video',
        website: 'Website',
      },
      viewDetails: 'View details',
      closeModal: 'Close modal',
      closeBtn: 'Close',
      orderSimilarBtn: 'Order Similar Project',
      items: {
        p1: {
          title: 'Bistro Arslan — Restaurant Menu',
          resultMetric: '320 copies printed',
          client: 'Bistro Arslan, Bishkek',
          summary:
            'A 12-page custom printed menu featuring clear dish hierarchy and highly legible modern typography.',
        },
        p2: {
          title: 'Aether Advisory — Premium Cards',
          resultMetric: '1,000 cards produced',
          client: 'Aether Consulting',
          summary:
            'Matte black heavyweight corporate business cards finished with metallic emerald foil accents.',
        },
        p3: {
          title: 'Harmony Brand — Promo Reel',
          resultMetric: '45,000+ views',
          client: 'Harmony Studio',
          summary:
            '30-second high-energy social media ad featuring color grading, motion pacing, and crisp voiceover.',
        },
        p4: {
          title: 'Quantum Dynamics — Corporate Site',
          resultMetric: '+65% inbound leads',
          client: 'Quantum Logistics KG',
          summary:
            'Responsive corporate web platform with a structured service catalog, quote calculator, and instant inquiry form.',
        },
        p5: {
          title: 'Foundry Cafe — Tabletop Menu',
          resultMetric: '150 table sets',
          client: 'Foundry Coffee House',
          summary:
            'Water-resistant laminated tabletop menu stands and seasonal beverage cards designed for daily hospitality use.',
        },
        p6: {
          title: 'Arket Store — E-Commerce Site',
          resultMetric: 'Mobile + Desktop UI',
          client: 'Arket Retail',
          summary:
            'Online retail storefront with category filtering, shopping cart, and fast checkout via phone or WhatsApp.',
        },
      },
    },
    orderForm: {
      eyebrow: 'Online Request',
      title: 'Place an Order',
      subtitle:
        'Select your service and quantity, enter your contact details, and our specialist will reach out within 15 minutes.',
      summaryHeading: 'Live Service Estimate',
      qtyLabel: 'Quantity:',
      estimatedTotalLabel: 'Estimated total:',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Azamat Aliev',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '0 559 146 555',
      serviceLabel: 'Service Type',
      quantityLabel: 'Quantity',
      commentLabel: 'Comments',
      commentPlaceholder: 'Design preferences, deadline, or extra notes...',
      submitBtn: 'Submit Order',
      errName: 'Please enter your full name.',
      errPhone:
        'Please enter a valid phone number (e.g. 0 559 146 555).',
      errQty: 'Quantity must be at least 1.',
      successTitle: 'Order Received',
      successTextPrefix: 'Thank you,',
      successTextMiddle: '! Your request has been registered. We will contact you shortly at',
      successTextSuffix: '.',
      summaryService: 'Service:',
      summaryQty: 'Quantity:',
      summaryTotal: 'Estimated total:',
      summaryComment: 'Comment:',
      newOrderBtn: 'Submit Another Order',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Get in Touch Directly',
      subtitle:
        'Available daily from 09:00 to 20:00 for project consultations and quick cost estimates.',
      phoneLabel: 'Phone',
      telegramLabel: 'Telegram',
      instagramLabel: 'Instagram',
      addressLabel: 'Address · Google Maps',
      addressValue: '18 Fuchika St',
      addressAria: '18 Fuchika St — Open in Google Maps',
      copyright: '© 2026 Sanarip IT. All rights reserved.',
    },
  },
};
