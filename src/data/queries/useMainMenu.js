import { graphql, useStaticQuery } from 'gatsby';
import Localize from '@util/Localize';

const query = graphql`
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
  }
`;

export default () => Localize(useStaticQuery(query).allMainMenuJson);
