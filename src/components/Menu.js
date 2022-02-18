import React from 'react';
import LocalizedLink from '@components/LocalizedLink';
import useMainMenu from '@queries/useMainMenu';

const Menu = ({ mobile, open }) => {
  const menuItems = useMainMenu();

  return (
    <div
      id="main-menu"
      className={`${mobile ? 'main-menu-mobile' : 'main-menu'} ${
        open && 'open'
      }`}
    >
      <ul>
        {menuItems.map((node) => (
          <li key={node.key}>
            <LocalizedLink to={node.url} activeClassName="active">
              {node.name}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
