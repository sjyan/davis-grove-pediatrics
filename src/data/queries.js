import { graphql, useStaticQuery } from 'gatsby';
import Localize from '@util/Localize';
import locales from '@i18n/config';

const queries = graphql`
  query {
    allMainMenuJson {
      edges {
        node {
          name
          url
          weight
          locale
        }
      }
    }
    allFooterMenuJson {
      edges {
        node {
          weight
          url
          name
          locale
        }
      }
    }
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
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const useMainMenu = () => Localize(useStaticQuery(queries).allMainMenuJson);

const useFooterMenu = () => Localize(useStaticQuery(queries).allFooterMenuJson);

const useSite = () => useStaticQuery(queries).site;

const useConfig = () => useStaticQuery(queries).configJson;

const useLocales = () => Object.keys(locales).map((locale) => locales[locale]);

export { useMainMenu, useFooterMenu, useSite, useConfig, useLocales };
