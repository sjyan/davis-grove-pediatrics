import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  query {
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
`;

export default () => useStaticQuery(query).configJson;
