import React from 'react';
import { graphql } from 'gatsby';
import LocalizedLink from '../components/LocalizedLink';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';
import useTranslations from '../components/useTranslations';

const Home = (props) => {
  const { view_services, and_more } = useTranslations();
  const { intro } = props.data;
  const site = props.data.site.siteMetadata;
  const services = props.data.services.edges;
  const features = props.data.features.edges;
  const providers = props.data.providers.edges;
  const introImageClasses = `intro-image ${
    intro.frontmatter.intro_image_absolute && 'intro-image-absolute'
  } ${
    intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'
  }`;
  const policiesRoute = '/policies#insurance';

  return (
    <Layout bodyClass="page-home">
      <SEO title={site.title} />
      <div className="intro strip strip-grey">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
              <Call showButton />
            </div>
            {intro.frontmatter.intro_image && (
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                <img
                  alt={intro.frontmatter.title}
                  className={introImageClasses}
                  src={intro.frontmatter.intro_image}
                  data-sal="slide-left"
                  data-sal-duration="1000"
                  data-sal-easing="ease"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {services.length > 0 && (
        <div className="strip">
          <div className="container pt-6 pb-6 pt-md-8 pb-md-8">
            <div className="row justify-content-center">
              {services.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-4 mb-4">
                  <div className="service service-summary">
                    <div className="service-content">
                      <h2 className="service-title">
                        <LocalizedLink to={node.fields.slug}>
                          {node.frontmatter.title}
                        </LocalizedLink>
                      </h2>
                      <p>{node.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center services-button">
              <div className="col-auto">
                <LocalizedLink
                  className="button button-primary"
                  to="/services/"
                >
                  {view_services}
                </LocalizedLink>
              </div>
            </div>
            <div className="row justify-content-start services-button-mobile">
              <div className="col-auto">
                <LocalizedLink
                  className="button button-primary"
                  to="/services/"
                >
                  {view_services}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {providers.length > 0 && (
        <div className="strip strip-grey">
          <div className="container pt-6 pb-6 pt-md-6 pb-md-6">
            <div className="row justify-content-center">
              {providers.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-6 col-lg-4 mb-2">
                  <div className="provider">
                    {node.image && (
                      <a
                        className="provider-image"
                        href={node.url}
                        target="_blank"
                      >
                        <img
                          src={node.image}
                          alt={node.url}
                          data-sal="fade"
                          data-sal-duration="1500"
                          data-sal-easing="ease"
                        />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container pt-6 pb-6 pt-md-6 pb-md-6">
            <div className="row justify-content-center">
              <LocalizedLink to={policiesRoute}>
                <h1>{and_more}</h1>
              </LocalizedLink>
            </div>
          </div>
        </div>
      )}

      {features.length > 0 && (
        <div className="strip">
          <div className="container pt-6 pb-6 pt-md-6 pb-md-6">
            <div className="row justify-content-center">
              {features.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-6 col-lg-4 mb-2">
                  <div className="feature">
                    {node.image && (
                      <div className="feature-image">
                        <img src={node.image} />
                      </div>
                    )}
                    <h2 className="feature-title">{node.title}</h2>
                    <div className="feature-content">{node.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const query = graphql`
  query($locale: String!) {
    services: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/services/.*/" }
        fields: { locale: { eq: $locale } }
      }
      sort: { fields: [frontmatter___weight], order: ASC }
      limit: 6
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    intro: markdownRemark(
      frontmatter: { path: { eq: "/" } }
      fields: { locale: { eq: $locale } }
    ) {
      html
      frontmatter {
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
        title
      }
    }
    providers: allProvidersJson {
      edges {
        node {
          id
          name
          image
          url
        }
      }
    }
    features: allFeaturesJson(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          description
          image
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Home;
