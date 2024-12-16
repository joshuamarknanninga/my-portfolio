// frontend/src/components/Donations/StripeDonationForm.js
import React, { useState } from 'react';
import {
  Form,
  Button,
  Input,
  Message,
  Segment,
  Header,
} from 'semantic-ui-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({ name: '', email: '', amount: '' });
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/donations/create-payment-intent`,
        {
          name: form.name,
          email: form.email,
          amount: parseFloat(form.amount),
        }
      );

      const clientSecret = data.clientSecret;

      // Confirm the payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.name,
            email: form.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setSuccess('Thank you for your donation!');
          setForm({ name: '', email: '', amount: '' });
          elements.getElement(CardElement).clear();
        }
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <Segment>
      <Header as="h3">Support Me with a Donation</Header>
      <Form onSubmit={handleSubmit} success={!!success} error={!!error}>
        <Form.Field
          control={Input}
          label="Name"
          placeholder="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Form.Field
          control={Input}
          label="Email"
          placeholder="Your Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Form.Field
          control={Input}
          label="Amount (USD)"
          placeholder="e.g., 5"
          name="amount"
          type="number"
          step="0.01"
          min="1"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <Form.Field
          control={CardElement}
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
        <Button
          type="submit"
          color="blue"
          disabled={!stripe || processing}
          loading={processing}
          style={{ marginTop: '1em' }}
        >
          Donate
        </Button>
        <Message
          success
          header="Donation Successful"
          content={success}
        />
        <Message
          error
          header="Donation Failed"
          content={error}
        />
      </Form>
    </Segment>
  );
};

const StripeDonationForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeDonationForm;
