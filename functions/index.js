'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const stripe = require('stripe')(functions.config().stripe.testkey);
const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();

/* app.post('/sub', (req, res) => {
  // Catch any unexpected errors to prevent crashing
  stripe.customers
    .create({
      email: req.body.email,
      source: req.body.stripeToken.id,
    })
    .then(customer => {
      res.send({ customer: customer });
    });
});
exports.subPost = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return app;
  });
}); */
exports.createStripeSubscription = functions.firestore
  .document('subscriptions/{userId}/{customerId}/{paymentId}')
  .onWrite(async (change, context) => {
    const payment = change.after.data();
    const userId = context.params.userId;
    const paymentId = context.params.paymentId;
    const amount = payment.amount * 100;
    const source = payment.token.id;
    const customer = await stripe.customers.create({
      email: userId, //param
      source: source,
    });
    // checks if payment exists or if it has already been charged
    if (!payment || payment.charge) return false;
    if (!customer) return false;

    return admin
      .firestore()
      .doc(`/users/${userId}`)
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .then(() => {
        return stripe.products.create({
          name: 'Give Monthly Product',
          type: 'service',
        });
      })
      .then(product => {
        return stripe.plans.create({
          product: product.id,
          nickname: 'Give Monthly Plan',
          currency: 'dkk',
          interval: 'month',
          amount: amount,
        });
      })
      .then(plan => {
        return stripe.subscriptions.create({
          customer: customer.id,
          items: [{ plan: plan.id }],
        });
      })
      .then(subscription => {
        admin
          .firestore()
          .doc(`/users/${userId}/subscriptions/${paymentId}`)
          .set(
            {
              subscription: subscription,
            },
            { merge: true },
          );
        /* "npm --prefix \"$RESOURCE_DIR\" run lint" */
      });
  });
/* exports.createStripeCharge = functions.firestore
  .document('payments/{userId}/charges/{paymentId}')
  .onWrite((change, context) => {
    const payment = change.after.data();
    const userId = context.params.userId;
    const paymentId = context.params.paymentId;

    // checks if payment exists or if it has already been charged
    if (!payment || payment.charge) return false;

    return admin
      .firestore()
      .doc(`/users/${userId}`)
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .then(customer => {
        const amount = payment.amount * 100;
        const idempotency_key = paymentId; // prevent duplicate charges
        const source = payment.token.id;
        const currency = 'dkk';
        const description = 'Another payment';
        const charge = { amount, currency, source };

        return stripe.charges.create(charge, { idempotency_key });
      })
      .then(charge => {
        admin
          .firestore()
          .doc(`/users/${userId}/payments/${paymentId}`)
          .set(
            {
              charge: charge,
            },
            { merge: true },
          );
        return;
      });
  }); */
