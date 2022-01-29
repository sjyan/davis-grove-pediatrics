import React from 'react';
import LocalizedLink from '../components/LocalizedLink';
import Menu from './Menu';
import Hamburger from './Hamburger';
import MenuMobile from './MenuMobile';
import { useConfig } from '@queries';
import Languages from '@components/Languages';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
  }

  toggleMenu = (menuActive) => {
    this.setState((prevState) => ({
      menuActive: !prevState.menuActive,
    }));
  };

  render() {
    const {
      logo: {
        desktopMasthead,
        mobileMasthead,
        phone,
        addressLine1,
        addressLine2,
      },
    } = this.props.data;

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
              {/* <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.desktop} /> */}
            </LocalizedLink>
          </div>
          <div className="logo-mobile">
            <LocalizedLink className="masthead" to="/">
              <h3 className="header-title">{mobileMasthead}</h3>
              <h3 className="contact">{phone}</h3>
              <h3 className="contact">{addressLine1}</h3>
              <h3 className="contact">{addressLine2}</h3>
              {/* <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.mobile} /> */}
            </LocalizedLink>
          </div>
          <MenuMobile active={this.state.menuActive} />
          <div className="right-actions">
            <Languages />
            <Menu />
          </div>
          <Hamburger toggleMenu={this.toggleMenu} />
        </div>
      </div>
    );
  }
}

export default () => <Header data={useConfig()} />;
