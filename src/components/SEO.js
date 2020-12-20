import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import favicon from '../../static/doctor-favicon.svg';

const SEO = props => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const title = props.title || data.site.siteMetadata.title;
      const { description, image, url } = data.site.siteMetadata;
      return (
        <Helmet
          htmlAttributes={{
            lang: 'en'
          }}
          title={title}
          titleTemplate={props.title ? `%s` : `%s - ${data.site.siteMetadata.title}`}
          link={[
            { rel: 'shortcut icon', type: 'image/svg', href: `${favicon}` }
          ]}
        >
          { title && <meta name="og:title" content={ title } /> }
          { title && <meta name="twitter:title" content={ title } /> }
          { description && <meta name="description" content={ description } /> }
          { description && <meta name="og:description"content={ description } /> }
          { description && <meta name="twitter:description" content={ description } /> }
          { url && <meta name="og:url" content={ url } /> }
          { image && <meta name="image" content={ image } /> }
          { image && <meta name="og:image" content={ image } /> }
          { image && <meta name="twitter:image" content={ image } /> }
       </Helmet>
      );
    }}
  />
);

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        url
        image
      }
    }
  }
`;
