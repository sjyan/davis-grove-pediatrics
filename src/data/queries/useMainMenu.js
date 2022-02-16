import { graphql, useStaticQuery } from 'gatsby';
import Localize from '@util/Localize';

const query = graphql`
  query {
    allMainMenuJson {
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
  Localize(useStaticQuery(query).allMainMenuJson)[0]?.node?.value;
