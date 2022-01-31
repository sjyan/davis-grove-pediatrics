import { graphql, useStaticQuery } from 'gatsby';
import Localize from '@util/Localize';

const query = graphql`
  query {
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
  }
`;

export default () => Localize(useStaticQuery(query).allFooterMenuJson);
