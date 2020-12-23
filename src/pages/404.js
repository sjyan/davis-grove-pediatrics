import React from 'react';
import Layout from '../components/Layout';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout bodyClass="secondary">
        <div className="intro strip strip-grey">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
                <h1>Sorry!</h1>
                <p>We couldn&#39;t find what you were looking for...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;
