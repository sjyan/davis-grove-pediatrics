import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default () => useStaticQuery(query).site;
