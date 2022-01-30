import { useLocales } from '@queries';

const getLocaleNameFromCode = (localeCode) => {
  const locales = useLocales();
  const { name } = locales.find((locale) => locale.path === localeCode);

  return name;
};

export { getLocaleNameFromCode };
