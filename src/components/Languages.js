import React from 'react';
import LocalizedLink from './LocalizedLink';
import { useLocales } from '@queries';
import { LocaleContext } from '@components/GlobalLayout';

const Languages = () => {
  const locales = useLocales();
  const { locale: currentLocale, path } = React.useContext(LocaleContext);

  return (
    <div id="languages-menu" className="languages-menu">
      <ul>
        {locales.map((locale) => {
          return (
            <li key={locale.path}>
              <LocalizedLink locale={locale.path} to={`${path}`}>
                <span className={locale.path === currentLocale ? `active` : ``}>
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

export default Languages;
