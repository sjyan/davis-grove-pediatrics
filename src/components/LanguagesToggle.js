import React, { useState } from 'react';
import { getLocaleNameFromCode } from '@util/i18n';
import { LocaleContext } from '@components/GlobalLayout';
import useTranslations from '@components/useTranslations';

const LanguagesToggle = ({ toggleMenu, disabled }) => {
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
    toggleMenu(active);
  };

  const { locale: currentLocaleCode } = React.useContext(LocaleContext);
  const { close_menu } = useTranslations();

  return (
    <button
      id="toggle-languages-mobile"
      className={`languages-toggle hamburger hamburger--slider ${
        active ? 'is-active' : ''
      }`}
      type="button"
      onClick={disabled ? () => {} : handleToggle}
    >
      <span>
        {active ? close_menu : getLocaleNameFromCode(currentLocaleCode)}
      </span>
    </button>
  );
};

export default LanguagesToggle;
