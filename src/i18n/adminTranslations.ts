import type { OrderStatus } from '../data/services';
import type { Language } from './translations';

export interface AdminTranslations {
  footerLink: string;
  breadcrumbRoot: string;
  breadcrumbSection: string;
  backToSite: string;
  logout: string;
  login: {
    title: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    submitBtn: string;
    submitting: string;
    invalidError: string;
    defaultHint: string;
  };
  tabs: {
    orders: string;
    services: string;
    portfolio: string;
    settings: string;
  };
  kpi: {
    totalOrders: string;
    newOrders: string;
    completedOrders: string;
    totalRevenue: string;
  };
  orders: {
    searchPlaceholder: string;
    filterAll: string;
    statuses: Record<OrderStatus, string>;
    colId: string;
    colClient: string;
    colService: string;
    colQty: string;
    colTotal: string;
    colDate: string;
    colStatus: string;
    colActions: string;
    emptyTitle: string;
    emptySubtitle: string;
    loadingText: string;
    deleteConfirm: string;
    noComment: string;
    commentLabel: string;
    refreshBtn: string;
  };
  servicesEditor: {
    title: string;
    subtitle: string;
    unitPriceLabel: string;
    saveBtn: string;
    savedMsg: string;
    errorMsg: string;
  };
  portfolioEditor: {
    title: string;
    subtitle: string;
    addTitle: string;
    fieldTitle: string;
    fieldCategory: string;
    fieldClient: string;
    fieldMetric: string;
    fieldYear: string;
    fieldSummary: string;
    addBtn: string;
    deleteBtn: string;
    addedMsg: string;
    errorMsg: string;
  };
  settingsEditor: {
    contactsTitle: string;
    contactsSubtitle: string;
    phoneLabel: string;
    telegramLabel: string;
    instagramLabel: string;
    addressLabel: string;
    mapsQueryLabel: string;
    saveContactsBtn: string;
    contactsSavedMsg: string;
    passwordTitle: string;
    currentPasswordLabel: string;
    newPasswordLabel: string;
    savePasswordBtn: string;
    passwordSavedMsg: string;
    passwordErrorMsg: string;
  };
}

export const ADMIN_TRANSLATIONS: Record<Language, AdminTranslations> = {
  ky: {
    footerLink: 'Админ панель',
    breadcrumbRoot: 'Санарип IT',
    breadcrumbSection: 'Админ панель',
    backToSite: 'Сайтка кайтуу',
    logout: 'Чыгуу',
    login: {
      title: 'Админ панелге кирүү',
      subtitle: 'Буюртмаларды, бааларды жана портфолиону башкаруу үчүн кириңиз.',
      emailLabel: 'Электрондук почта',
      passwordLabel: 'Сырсөз',
      submitBtn: 'Кирүү',
      submitting: 'Текшерилүүдө...',
      invalidError: 'Почта же сырсөз туура эмес.',
      defaultHint: 'Баштапкы кирүү маалыматы:',
    },
    tabs: {
      orders: 'Буюртмалар',
      services: 'Баалар',
      portfolio: 'Портфолио',
      settings: 'Байланыш жана сырсөз',
    },
    kpi: {
      totalOrders: 'Бардык буюртмалар',
      newOrders: 'Жаңы өтүнмөлөр',
      completedOrders: 'Аткарылгандар',
      totalRevenue: 'Жалпы сумма',
    },
    orders: {
      searchPlaceholder: 'Кардардын аты же номери боюнча издөө...',
      filterAll: 'Баары',
      statuses: {
        new: 'Жаңы',
        in_progress: 'Иштелүүдө',
        completed: 'Аткарылды',
        cancelled: 'Жокко чыгарылды',
      },
      colId: 'ID',
      colClient: 'Кардар',
      colService: 'Кызмат',
      colQty: 'Саны',
      colTotal: 'Сумма',
      colDate: 'Күнү',
      colStatus: 'Абалы',
      colActions: 'Аракет',
      emptyTitle: 'Буюртмалар табылган жок',
      emptySubtitle: 'Чыпканы өзгөртүңүз же жаңы кардар өтүнмөлөрүн күтүңүз.',
      loadingText: 'Буюртмалар жүктөлүүдө...',
      deleteConfirm: 'Бул буюртманы өчүрөсүзбү?',
      noComment: 'Комментарий калтырылган эмес',
      commentLabel: 'Комментарий:',
      refreshBtn: 'Жаңылоо',
    },
    servicesEditor: {
      title: 'Кызмат бааларын башкаруу',
      subtitle:
        'Өзгөртүлгөн баалар сайттагы карточкаларда, калькулятордо жана буюртма формасында дароо жаңыланат.',
      unitPriceLabel: 'Бирдик баасы',
      saveBtn: 'Сактоо',
      savedMsg: 'Баа сакталды',
      errorMsg: 'Туура баа жазыңыз',
    },
    portfolioEditor: {
      title: 'Портфолио долбоорлору',
      subtitle: 'Жаңы аткарылган иштерди кошуңуз же эскилерин өчүрүңүз.',
      addTitle: 'Жаңы долбоор кошуу',
      fieldTitle: 'Долбоордун аталышы',
      fieldCategory: 'Категория',
      fieldClient: 'Кардар / Шаар',
      fieldMetric: 'Натыйжа (мис: 200 даана)',
      fieldYear: 'Жылы',
      fieldSummary: 'Кыскача сүрөттөмө',
      addBtn: 'Портфолиого кошуу',
      deleteBtn: 'Өчүрүү',
      addedMsg: 'Долбоор ийгиликтүү кошулду',
      errorMsg: 'Аталышын жана сүрөттөмөсүн толук жазыңыз',
    },
    settingsEditor: {
      contactsTitle: 'Байланыш маалыматтары',
      contactsSubtitle: 'Сайттагы телефон, Telegram, Instagram жана карта дарегин жаңыртуу.',
      phoneLabel: 'Телефон',
      telegramLabel: 'Telegram (номер же @ник)',
      instagramLabel: 'Instagram (@ник)',
      addressLabel: 'Дарек (көрсөтүлүүчү текст)',
      mapsQueryLabel: 'Google Maps издөө дареги',
      saveContactsBtn: 'Байланышты сактоо',
      contactsSavedMsg: 'Байланыш маалыматтары сакталды',
      passwordTitle: 'Админ сырсөзүн өзгөртүү',
      currentPasswordLabel: 'Учурдагы сырсөз',
      newPasswordLabel: 'Жаңы сырсөз (кеминде 6 белги)',
      savePasswordBtn: 'Сырсөздү жаңыртуу',
      passwordSavedMsg: 'Сырсөз ийгиликтүү өзгөртүлдү',
      passwordErrorMsg: 'Учурдагы сырсөз туура эмес же жаңысы кыска',
    },
  },

  ru: {
    footerLink: 'Админ-панель',
    breadcrumbRoot: 'Санарип IT',
    breadcrumbSection: 'Админ-панель',
    backToSite: 'Вернуться на сайт',
    logout: 'Выйти',
    login: {
      title: 'Вход в админ-панель',
      subtitle: 'Войдите для управления заказами, ценами и портфолио.',
      emailLabel: 'Электронная почта',
      passwordLabel: 'Пароль',
      submitBtn: 'Войти',
      submitting: 'Проверка...',
      invalidError: 'Неверный email или пароль.',
      defaultHint: 'Данные по умолчанию:',
    },
    tabs: {
      orders: 'Заказы',
      services: 'Цены',
      portfolio: 'Портфолио',
      settings: 'Контакты и пароль',
    },
    kpi: {
      totalOrders: 'Всего заказов',
      newOrders: 'Новые заявки',
      completedOrders: 'Выполнено',
      totalRevenue: 'Общая сумма',
    },
    orders: {
      searchPlaceholder: 'Поиск по имени клиента или телефону...',
      filterAll: 'Все',
      statuses: {
        new: 'Новый',
        in_progress: 'В работе',
        completed: 'Выполнен',
        cancelled: 'Отменён',
      },
      colId: 'ID',
      colClient: 'Клиент',
      colService: 'Услуга',
      colQty: 'Кол-во',
      colTotal: 'Сумма',
      colDate: 'Дата',
      colStatus: 'Статус',
      colActions: 'Действия',
      emptyTitle: 'Заказы не найдены',
      emptySubtitle: 'Измените фильтр или дождитесь новых заявок с сайта.',
      loadingText: 'Загрузка заказов...',
      deleteConfirm: 'Удалить этот заказ?',
      noComment: 'Комментарий отсутствует',
      commentLabel: 'Комментарий:',
      refreshBtn: 'Обновить',
    },
    servicesEditor: {
      title: 'Управление ценами услуг',
      subtitle:
        'Обновлённые цены сразу применяются в карточках услуг, калькуляторе и форме заказа.',
      unitPriceLabel: 'Цена за единицу',
      saveBtn: 'Сохранить',
      savedMsg: 'Цена сохранена',
      errorMsg: 'Введите корректную цену',
    },
    portfolioEditor: {
      title: 'Проекты портфолио',
      subtitle: 'Добавляйте новые работы или удаляйте существующие.',
      addTitle: 'Добавить проект',
      fieldTitle: 'Название проекта',
      fieldCategory: 'Категория',
      fieldClient: 'Клиент / Город',
      fieldMetric: 'Результат (напр.: 200 шт.)',
      fieldYear: 'Год',
      fieldSummary: 'Краткое описание',
      addBtn: 'Добавить в портфолио',
      deleteBtn: 'Удалить',
      addedMsg: 'Проект успешно добавлен',
      errorMsg: 'Заполните название и описание проекта',
    },
    settingsEditor: {
      contactsTitle: 'Контактные данные',
      contactsSubtitle: 'Обновление телефона, Telegram, Instagram и адреса Google Карт на сайте.',
      phoneLabel: 'Телефон',
      telegramLabel: 'Telegram (номер или @ник)',
      instagramLabel: 'Instagram (@ник)',
      addressLabel: 'Адрес (текст на сайте)',
      mapsQueryLabel: 'Запрос для Google Карт',
      saveContactsBtn: 'Сохранить контакты',
      contactsSavedMsg: 'Контакты обновлены',
      passwordTitle: 'Смена пароля администратора',
      currentPasswordLabel: 'Текущий пароль',
      newPasswordLabel: 'Новый пароль (мин. 6 символов)',
      savePasswordBtn: 'Обновить пароль',
      passwordSavedMsg: 'Пароль успешно изменён',
      passwordErrorMsg: 'Неверный текущий пароль или слишком короткий новый',
    },
  },

  uz: {
    footerLink: 'Админ панель',
    breadcrumbRoot: 'Санарип IT',
    breadcrumbSection: 'Админ панель',
    backToSite: 'Сайтга қайтиш',
    logout: 'Чиқиш',
    login: {
      title: 'Админ панелга кириш',
      subtitle: 'Буюртмалар, нархлар ва портфолиони бошқариш учун киринг.',
      emailLabel: 'Электрон почта',
      passwordLabel: 'Парол',
      submitBtn: 'Кириш',
      submitting: 'Текширилмоқда...',
      invalidError: 'Почта ёки парол нотўғри.',
      defaultHint: 'Бошланғич кириш маълумоти:',
    },
    tabs: {
      orders: 'Буюртмалар',
      services: 'Нархлар',
      portfolio: 'Портфолио',
      settings: 'Алоқа ва парол',
    },
    kpi: {
      totalOrders: 'Барча буюртмалар',
      newOrders: 'Янги аризалар',
      completedOrders: 'Бажарилганлар',
      totalRevenue: 'Умумий сумма',
    },
    orders: {
      searchPlaceholder: 'Мижоз исми ёки рақами бўйича қидириш...',
      filterAll: 'Барчаси',
      statuses: {
        new: 'Янги',
        in_progress: 'Жараёнда',
        completed: 'Бажарилди',
        cancelled: 'Бекор қилинди',
      },
      colId: 'ID',
      colClient: 'Мижоз',
      colService: 'Хизмат',
      colQty: 'Сони',
      colTotal: 'Сумма',
      colDate: 'Сана',
      colStatus: 'Ҳолати',
      colActions: 'Амал',
      emptyTitle: 'Буюртмалар топилмади',
      emptySubtitle: 'Филтрни ўзгартиринг ёки янги аризаларни кутинг.',
      loadingText: 'Буюртмалар юкланмоқда...',
      deleteConfirm: 'Ушбу буюртмани ўчирасизми?',
      noComment: 'Изоҳ қолдирилмаган',
      commentLabel: 'Изоҳ:',
      refreshBtn: 'Янгилаш',
    },
    servicesEditor: {
      title: 'Хизмат нархларини бошқариш',
      subtitle:
        'Ўзгартирилган нархлар сайтдаги карточкаларда, калькуляторда ва буюртма формасида дарҳол янгиланади.',
      unitPriceLabel: 'Бирлик нархи',
      saveBtn: 'Сақлаш',
      savedMsg: 'Нарх сақланди',
      errorMsg: 'Тўғри нарх киритинг',
    },
    portfolioEditor: {
      title: 'Портфолио лойиҳалари',
      subtitle: 'Янги бажарилган ишларни қўшинг ёки мавжудларини ўчиринг.',
      addTitle: 'Янги лойиҳа қўшиш',
      fieldTitle: 'Лойиҳа номи',
      fieldCategory: 'Категория',
      fieldClient: 'Мижоз / Шаҳар',
      fieldMetric: 'Натижа (мас: 200 дона)',
      fieldYear: 'Йил',
      fieldSummary: 'Қисқача тавсиф',
      addBtn: 'Портфолиого қўшиш',
      deleteBtn: 'Ўчириш',
      addedMsg: 'Лойиҳа муваффақиятли қўшилди',
      errorMsg: 'Номи ва тавсифини тўлиқ киритинг',
    },
    settingsEditor: {
      contactsTitle: 'Алоқа маълумотлари',
      contactsSubtitle: 'Сайтдаги телефон, Telegram, Instagram ва харита манзилини янгилаш.',
      phoneLabel: 'Телефон',
      telegramLabel: 'Telegram (рақам ёки @ник)',
      instagramLabel: 'Instagram (@ник)',
      addressLabel: 'Манзил (кўринадиган матн)',
      mapsQueryLabel: 'Google Maps қидирув манзили',
      saveContactsBtn: 'Алоқани сақлаш',
      contactsSavedMsg: 'Алоқа маълумотлари сақланди',
      passwordTitle: 'Админ паролини ўзгартириш',
      currentPasswordLabel: 'Жорий парол',
      newPasswordLabel: 'Янги парол (камида 6 белги)',
      savePasswordBtn: 'Паролни янгилаш',
      passwordSavedMsg: 'Парол муваффақиятли ўзгартирилди',
      passwordErrorMsg: 'Жорий парол нотўғри ёки янгиси қисқа',
    },
  },

  en: {
    footerLink: 'Admin Panel',
    breadcrumbRoot: 'Sanarip IT',
    breadcrumbSection: 'Admin Panel',
    backToSite: 'Back to Site',
    logout: 'Sign Out',
    login: {
      title: 'Admin Sign In',
      subtitle: 'Sign in to manage customer orders, pricing, and portfolio items.',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      submitBtn: 'Sign In',
      submitting: 'Signing in...',
      invalidError: 'Invalid email or password.',
      defaultHint: 'Default credentials:',
    },
    tabs: {
      orders: 'Orders',
      services: 'Pricing',
      portfolio: 'Portfolio',
      settings: 'Contacts & Security',
    },
    kpi: {
      totalOrders: 'Total Orders',
      newOrders: 'New Requests',
      completedOrders: 'Completed',
      totalRevenue: 'Total Revenue',
    },
    orders: {
      searchPlaceholder: 'Search by client name or phone...',
      filterAll: 'All',
      statuses: {
        new: 'New',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },
      colId: 'ID',
      colClient: 'Client',
      colService: 'Service',
      colQty: 'Qty',
      colTotal: 'Total',
      colDate: 'Date',
      colStatus: 'Status',
      colActions: 'Actions',
      emptyTitle: 'No orders found',
      emptySubtitle: 'Try clearing the filter or wait for new customer requests.',
      loadingText: 'Loading orders...',
      deleteConfirm: 'Delete this order?',
      noComment: 'No comment provided',
      commentLabel: 'Comment:',
      refreshBtn: 'Refresh',
    },
    servicesEditor: {
      title: 'Service Pricing Management',
      subtitle:
        'Updated unit prices take effect immediately across cards, calculator, and the order form.',
      unitPriceLabel: 'Unit Price',
      saveBtn: 'Save',
      savedMsg: 'Price saved',
      errorMsg: 'Enter a valid price',
    },
    portfolioEditor: {
      title: 'Portfolio Projects',
      subtitle: 'Add new work samples or remove existing ones.',
      addTitle: 'Add New Project',
      fieldTitle: 'Project Title',
      fieldCategory: 'Category',
      fieldClient: 'Client / City',
      fieldMetric: 'Outcome (e.g. 200 pcs)',
      fieldYear: 'Year',
      fieldSummary: 'Short Summary',
      addBtn: 'Add to Portfolio',
      deleteBtn: 'Delete',
      addedMsg: 'Project added successfully',
      errorMsg: 'Please fill in both title and summary',
    },
    settingsEditor: {
      contactsTitle: 'Contact Details',
      contactsSubtitle: 'Update phone, Telegram, Instagram, and Google Maps address on the site.',
      phoneLabel: 'Phone',
      telegramLabel: 'Telegram (number or @handle)',
      instagramLabel: 'Instagram (@handle)',
      addressLabel: 'Address (display text)',
      mapsQueryLabel: 'Google Maps query',
      saveContactsBtn: 'Save Contacts',
      contactsSavedMsg: 'Contact details saved',
      passwordTitle: 'Change Admin Password',
      currentPasswordLabel: 'Current Password',
      newPasswordLabel: 'New Password (min 6 chars)',
      savePasswordBtn: 'Update Password',
      passwordSavedMsg: 'Password updated successfully',
      passwordErrorMsg: 'Current password is incorrect or new password is too short',
    },
  },
};
