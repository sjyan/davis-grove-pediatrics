import React from 'react';
import LocalizedLink from '@components/LocalizedLink';
import useFooterMenu from '@queries/useFooterMenu';
import useSite from '@queries/useSite';

const Footer = () => {
  const menuItems = useFooterMenu();
  const site = useSite();

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-inner">
              <h3 className="footer-title">{site.siteMetadata.title}</h3>
              <ul>
                {menuItems.map((node) => (
                  <li key={node.key}>
                    <LocalizedLink to={node.url}>{node.name}</LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
