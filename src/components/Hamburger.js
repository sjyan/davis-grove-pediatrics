import React, { useState } from 'react';

const Hamburger = ({ toggleMenu, disabled }) => {
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
    toggleMenu(active);
  };

  return (
    <button
      id="toggle-main-menu-mobile"
      className={`hamburger hamburger--slider ${active ? 'is-active' : ''}`}
      type="button"
      onClick={disabled ? () => {} : handleToggle}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  );
};

export default Hamburger;
