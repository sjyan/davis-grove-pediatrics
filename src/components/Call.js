import React from 'react';
import useTranslations from '@components/useTranslations';
import LocalizedLink from '@components/LocalizedLink';
import useContact from '@queries/useContact';

const Call = (props) => {
  const { contact, phone, secondary_phone, fax, address } = useTranslations();
  const data = useContact();

  if (props.showInfo) {
    return (
      <div className="call">
        <div className="call-box-top">
          {data.phone && (
            <div className="call-phone">
              <strong>{phone}: </strong> {data.phone}{' '}
            </div>
          )}
          {data.secondaryPhone && (
            <div className="call-phone">
              <strong>{secondary_phone}: </strong> {data.secondaryPhone}{' '}
            </div>
          )}
          {data.fax && (
            <div className="call-fax">
              <strong>{fax}: </strong> {data.fax}{' '}
            </div>
          )}
          {data.address && (
            <div className="call-address">
              <strong>{address}: </strong>
              <a href={data.address.url} target="_blank">
                {' '}
                {data.address.display}{' '}
              </a>
            </div>
          )}
          {props.showButton && (
            <div className="call-box-bottom">
              <a href={data.contact_button_link} className="button">
                Contact
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (props.showButton) {
    return (
      props.showButton && (
        <div className="call-box-bottom">
          <LocalizedLink to={data.contact_button_link} className="button">
            {contact}
          </LocalizedLink>
        </div>
      )
    );
  }
};

export default Call;
