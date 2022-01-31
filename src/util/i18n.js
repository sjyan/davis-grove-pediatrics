import useLocales from '@queries/useLocales';

const getLocaleNameFromCode = (localeCode) => {
  const locales = useLocales();
  const { name } = locales.find((locale) => locale.path === localeCode);

  return name;
};

export { getLocaleNameFromCode };
