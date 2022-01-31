import locales from '@i18n/config';

export default () => Object.keys(locales).map((locale) => locales[locale]);
