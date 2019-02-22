import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Form } from 'semantic-ui-react';
import axios from 'axios';

import { withFirebase } from '../Firebase';

class SubPaymentForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    stripeToken: '',
    name: '',
    email: '',
    price: null,
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getStripeToken = async e => {
    e.preventDefault();
    //make the call to the NodeJs Striper Server to create the charge
    let { token } = await this.props.stripe.createToken({
      name: this.state.name,
    });
    /*     let { customer } = await axios.post(
      'https://us-central1-digital-forening.cloudfunctions.net/subPost',
      {
        email: this.state.email,
        stripeToken: token,
      },
    ); */
    const payment = { token: token, amount: this.state.price };
    this.props.firebase
      .subscriptions()
      .doc(this.state.email)
      .collection('charge')
      .doc(payment.token.id)
      .set(payment)
      .then(function() {
        console.log('Sub successfully written!');
      });
  };

  render() {
    return (
      <div>
        <h1>Give Monthly</h1>
        <Form
          onSubmit={this.getStripeToken}
          className="subPaymentForm"
        >
          <Form.Field>
            <input
              type="text"
              name="name"
              onChange={this.changeHandler}
              placeholder="Your Name"
            />
          </Form.Field>
          <Form.Field>
            <input
              type="email"
              name="email"
              onChange={this.changeHandler}
              placeholder="Your Email"
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              name="price"
              onChange={this.changeHandler}
              placeholder="Donation in dkk"
            />
          </Form.Field>

          <CardElement />
          <Form.Field>
            <input type="submit" value="Pay" />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default withFirebase(injectStripe(SubPaymentForm));
