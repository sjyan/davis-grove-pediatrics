import React from 'react';
import LocalizedLink from '@components/LocalizedLink';
import { useMainMenu } from '@queries';

const Menu = () => {
  const menuItems = useMainMenu();

  return (
    <div id="main-menu" className="main-menu">
      <ul>
        {menuItems.map(({ node }) => (
          <li key={node.name}>
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
