import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import LocalizedLink from '../components/LocalizedLink';

const Services = (props) => {
  const services = props.data.services.edges;
  const { intro } = props.data;
  const introImageClasses = `intro-image ${
    intro.frontmatter.intro_image_absolute && 'intro-image-absolute'
  } ${
    intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'
  }`;

  return (
    <Layout bodyClass="page-services">
      <SEO title="Services" />

      <div className="intro strip strip-grey">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
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

      <div className="container pb-6 pt-6">
        <div className="row justify-content-center">
          {services.map((edge) => (
            <div key={edge.node.id} className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2>
                    <LocalizedLink to={edge.node.fields.slug}>
                      {edge.node.frontmatter.title}
                    </LocalizedLink>
                  </h2>
                  <p>{edge.node.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ServicesQuery($locale: String!) {
    services: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/services/.*/" }
        fields: { locale: { eq: $locale } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    intro: markdownRemark(
      frontmatter: { path: { eq: "/services" } }
      fields: { locale: { eq: $locale } }
    ) {
      html
      frontmatter {
        title
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
      }
    }
  }
`;

export default Services;
