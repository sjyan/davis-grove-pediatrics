import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Call = props => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
        contactJson {
          phone
          fax
          email
          address {
            display
            url
          }
          contact_button_link
        }
    }
   `);

   return props.showButton && (
      <div className="call-box-bottom">
        <a href={data.contactJson.contact_button_link} className="button">Contact</a>
      </div>
   );

  // return (
  //   <div className="call">
  //     <div className="call-box-top">
  //       {data.contactJson.phone && (
  //         <div className="call-phone">
  //           <strong>Phone: </strong>
  //           {' '}
  //           { data.contactJson.phone }
  //           {' '}
  //         </div>
  //       )}
  //       {data.contactJson.fax && (
  //         <div className="call-fax">
  //           <strong>Fax: </strong>
  //           {' '}
  //           { data.contactJson.fax }
  //           {' '}
  //         </div>
  //       )}
  //       {data.contactJson.address && (
  //         <div className="call-address">
  //           <strong>Address: </strong>
  //           <a href={data.contactJson.address.url} target="_blank">
  //             {' '}
  //             { data.contactJson.address.display }
  //             {' '}
  //           </a>
  //         </div>
  //       )}
  //       {/* data.contactJson.email && (
  //         <div className="call-email">
  //           <strong>Email: </strong>
  //           <a href={`mailto:${data.contactJson.email}`}>
  //             {data.contactJson.email}
  //           </a>
  //         </div>
  //       ) */}
  //     </div>
  //     {/* props.showButton && (
  //       <div className="call-box-bottom">
  //         <a href={data.contactJson.contact_button_link} className="button">Contact</a>
  //       </div>
  //     ) */}
  //   </div>
  // );
};

export default Call;
