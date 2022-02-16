// Only one item MUST have the "default: true" key

module.exports = {
  en: {
    default: true,
    prefixed: true,
    path: `en`,
    locale: `en-US`,
    name: `English`,
    dateFormat: `MM/DD/YYYY`,
    siteLanguage: `en`,
    ogLanguage: `en_US`,
    defaultTitle: `Davis Grove Pediatrics`,
    defaultDescription: `where little things matter`,
  },
  es: {
    path: `es`,
    locale: `es-MX`,
    name: `Español`,
    dateFormat: `DD.MM.YYYY`,
    siteLanguage: `es`,
    ogLanguage: `es_MX`,
    defaultTitle: `Davis Grove Pediatrics`,
    defaultDescription: `donde las pequeñas cosas importan`,
  },
  ko: {
    path: `ko`,
    locale: `ko-KR`,
    name: `한국어`,
    dateFormat: `YYYY-MM-DD`,
    siteLanguage: `ko`,
    ogLanguage: `ko_KR`,
    defaultTitle: `Davis Grove Pediatrics`,
    defaultDescription: `Gatsby Beispielseite, die MDX und i18n (frei von dependencies) nutzt`,
  },
};
