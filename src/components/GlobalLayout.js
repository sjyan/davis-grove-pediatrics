import React from 'react';
import '../scss/style.scss';

const LocaleContext = React.createContext();

const GlobalLayout = (props) => {
  const {
    children,
    path,
    pageContext: { locale },
  } = props;

  const purePath = pathWithoutLocale(path, locale);

  return (
    <LocaleContext.Provider value={{ locale, path: purePath }}>
      {children}
    </LocaleContext.Provider>
  );
};

const pathWithoutLocale = (path, locale) => {
  // We don't want to wind up returning empty path for home paths
  if (path === `/` || path === `/${locale}`) {
    return `/`;
  }
  // If any other path then we'll strip out the locale
  return path.replace(`/${locale}`, '');
};

export { GlobalLayout, LocaleContext };
