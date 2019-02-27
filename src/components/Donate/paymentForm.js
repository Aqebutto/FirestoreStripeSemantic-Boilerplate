import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Form } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

class PaymentForm extends Component {
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
    let { token } = await this.props.stripe.createToken({
      name: this.state.name,
    });

    console.log(token);

    const payment = { token: token, amount: this.state.price };
    this.props.firebase
      .payments()
      .doc(this.state.email)
      .collection('charges')
      .doc(payment.token.id)
      .set(payment)
      .then(function() {
        console.log('Donation successfully written!');
      });
  };

  render() {
    return (
      <div>
        <h1>Donate</h1>
        <Form onSubmit={this.getStripeToken} className="paymentForm">
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

export default withFirebase(injectStripe(PaymentForm));
