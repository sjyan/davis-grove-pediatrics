import React from 'react';
import LocalizedLink from './LocalizedLink';
import useLocales from '@queries/useLocales';
import { LocaleContext } from '@components/GlobalLayout';

const Languages = () => {
  const locales = useLocales();
  const { locale: currentLocaleCode, path } = React.useContext(LocaleContext);

  return (
    <div id="languages-menu" className="languages-menu">
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

export default Languages;
