import React, { useState } from 'react';
import LocalizedLink from '../components/LocalizedLink';
import Menu from './Menu';
import Hamburger from './Hamburger';
import { useConfig } from '@queries';
import Languages from '@components/Languages';
import LanguagesToggle from '@components/LanguagesToggle';
import LanguagesMobile from '@components/LanguagesMobile';

const Header = ({ data: { logo } }) => {
  const {
    desktopMasthead,
    mobileMasthead,
    phone,
    addressLine1,
    addressLine2,
  } = logo;

  const [menuActive, setMenuActive] = useState(false);
  const [languagesActive, setLanguagesActive] = useState(false);

  const toggleMenu = () => setMenuActive(!menuActive);
  const toggleLanguages = () => setLanguagesActive(!languagesActive);

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <LocalizedLink className="masthead" to="/">
            <h3 className="header-title">{desktopMasthead}</h3>
            <h3 className="contact">{phone}</h3>
            <h3 className="contact">
              {[addressLine1, addressLine2].join(', ')}
            </h3>
          </LocalizedLink>
        </div>
        <div className="logo-mobile">
          <LocalizedLink className="masthead" to="/">
            <h3 className="header-title">{mobileMasthead}</h3>
            <h3 className="contact">{phone}</h3>
            <h3 className="contact">{addressLine1}</h3>
            <h3 className="contact">{addressLine2}</h3>
          </LocalizedLink>
        </div>
        <LanguagesMobile mobile={true} open={languagesActive} />
        <Menu mobile={true} open={menuActive} />
        <div className="right-actions">
          <Languages />
          <Menu />
        </div>
        <div className="mobile-actions">
          <LanguagesToggle toggleMenu={toggleLanguages} disabled={menuActive} />
          <Hamburger toggleMenu={toggleMenu} disabled={languagesActive} />
        </div>
      </div>
    </div>
  );
};

export default () => <Header data={useConfig()} />;
