import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import PaymentForm from './paymentForm';

export default class Donate extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_Ba2BNqKwFMRz1SRHzizA9gGJ">
          <Elements>
            <PaymentForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
