import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import SubPaymentForm from './subPaymentForm';
import * as PUBLIC_KEY from '../../constants/stripe';

export default class SubDonate extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey={PUBLIC_KEY.PUBLIC_KEY}>
          <Elements>
            <SubPaymentForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
