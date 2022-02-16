import { graphql, useStaticQuery } from 'gatsby';
import Localize from '@util/Localize';

const query = graphql`
  query {
    allFooterMenuJson {
      edges {
        node {
          value {
            key
            name
            url
            weight
          }
          locale
        }
      }
    }
  }
`;

export default () =>
  Localize(useStaticQuery(query).allFooterMenuJson)[0]?.node?.value;
