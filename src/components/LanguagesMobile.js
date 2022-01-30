import React from 'react';
import LocalizedLink from '@components/LocalizedLink';
import { useLocales } from '@queries';
import { LocaleContext } from '@components/GlobalLayout';

const LanguagesMobile = ({ mobile, open }) => {
  const locales = useLocales();
  const { locale: currentLocaleCode, path } = React.useContext(LocaleContext);

  return (
    <div
      id="languages-menu-mobile"
      className={`${mobile ? 'main-menu-mobile' : 'main-menu'} ${
        open && 'open'
      }`}
    >
      <ul>
        {locales.map((locale) => {
          return (
            <li key={locale.path}>
              <LocalizedLink locale={locale.path} to={`${path}`}>
                <span
                  className={locale.path === currentLocaleCode ? `active` : ``}
                >
                  {locale.name}
                </span>
              </LocalizedLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguagesMobile;
