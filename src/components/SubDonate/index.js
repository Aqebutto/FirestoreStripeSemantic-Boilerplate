import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import SubPaymentForm from './subPaymentForm';

export default class SubDonate extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_Ba2BNqKwFMRz1SRHzizA9gGJ">
          <Elements>
            <SubPaymentForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
