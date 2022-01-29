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
    defaultTitle: `Using i18n with Gatsby`,
    defaultDescription: `Gatsby example site using MDX and dependency-free i18n`,
  },
  es: {
    path: `es`,
    locale: `es-MX`,
    name: `Espanol`,
    dateFormat: `DD.MM.YYYY`,
    siteLanguage: `es`,
    ogLanguage: `es_MX`,
    defaultTitle: `i18n mit Gatsby nutzen`,
    defaultDescription: `Gatsby Beispielseite, die MDX und i18n (frei von dependencies) nutzt`,
  },
}