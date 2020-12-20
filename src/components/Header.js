import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Menu from './Menu';
import Hamburger from './Hamburger';
import MenuMobile from './MenuMobile';

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
    const config = this.props.data.configJson;
    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <Link className="masthead" to="/">
              <h3 className="header-title">{config.logo.desktopMasthead}</h3>
              <h3 className="contact">{config.logo.phone}</h3>
              <h3 className="contact">
                {[config.logo.addressLine1, config.logo.addressLine2].join(
                  ', '
                )}
              </h3>
              {/* <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.desktop} /> */}
            </Link>
          </div>
          <div className="logo-mobile">
            <Link className="masthead" to="/">
              <h3 className="header-title">{config.logo.mobileMasthead}</h3>
              <h3 className="contact">{config.logo.phone}</h3>
              <h3 className="contact">{config.logo.addressLine1}</h3>
              <h3 className="contact">{config.logo.addressLine2}</h3>
              {/* <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.mobile} /> */}
            </Link>
          </div>
          <MenuMobile active={this.state.menuActive} />
          <Menu />
          <Hamburger toggleMenu={this.toggleMenu} />
        </div>
      </div>
    );
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        configJson {
          logo {
            alt
            desktop
            mobile
            desktop_height
            desktopMasthead
            mobileMasthead
            phone
            addressLine1
            addressLine2
          }
        }
      }
    `}
    render={(data) => <Header data={data} />}
  />
);
