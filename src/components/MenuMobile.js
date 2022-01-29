import React from 'react';
import LocalizedLink from '@components/LocalizedLink';
import { useMainMenu } from '@queries';

const MobileMenu = (props) => {
  const menuItems = useMainMenu();

  return (
    <div
      id="main-menu-mobile"
      className={`main-menu-mobile ${props.active ? 'open' : ''}`}
    >
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

export default MobileMenu;
