import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import PaymentForm from './paymentForm';
import * as PUBLIC_KEY from '../../constants/stripe';

export default class Donate extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey={PUBLIC_KEY.PUBLIC_KEY}>
          <Elements>
            <PaymentForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
