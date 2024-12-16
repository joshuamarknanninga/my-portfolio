// frontend/src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { Container, Header, Form, Button, Message, Segment, Divider } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '../services/api';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { products } = state || { products: [] };

  const [form, setForm] = useState({ customerName: '', customerEmail: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      setProcessing(false);
      return;
    }

    try {
      // Create Payment Intent on the server
      const { clientSecret, orderId } = await createPaymentIntent({
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        products,
      });

      // Confirm the payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.customerName,
            email: form.customerEmail,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setSuccess('Payment successful! Thank you for your purchase.');
          // Redirect to order confirmation page
          navigate(`/orders/${orderId}`);
        }
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <Segment>
      <Header as="h3">Checkout</Header>
      <Form onSubmit={handleSubmit} success={!!success} error={!!error}>
        <Form.Input
          label="Name"
          placeholder="Your Name"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Email"
          placeholder="Your Email"
          name="customerEmail"
          type="email"
          value={form.customerEmail}
          onChange={handleChange}
          required
        />
        <Form.Field>
          <label>Credit or Debit Card</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Form.Field>
        <Button
          type="submit"
          color="blue"
          disabled={!stripe || processing || products.length === 0}
          loading={processing}
        >
          Pay Now
        </Button>
        <Message
          success
          header="Payment Successful"
          content={success}
        />
        <Message
          error
          header="Payment Failed"
          content={error}
        />
      </Form>
    </Segment>
  );
};

const CheckoutPage = () => {
  const location = useLocation();
  const { state } = location;
  const { products } = state || { products: [] };

  if (!products || products.length === 0) {
    return (
      <Container textAlign="center" style={{ marginTop: '7em' }}>
        <Message warning>
          <Message.Header>No Products Selected</Message.Header>
          <p>Please add products to your cart before proceeding to checkout.</p>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '7em' }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default CheckoutPage;
