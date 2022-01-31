import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  query {
    contactJson {
      phone
      secondaryPhone
      fax
      email
      address {
        display
        url
      }
      contact_button_link
    }
  }
`;

export default () => useStaticQuery(query).contactJson;
