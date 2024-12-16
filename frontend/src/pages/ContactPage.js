// frontend/src/pages/ContactPage.js
import React, { useState } from 'react';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';
import { sendContact } from '../services/api';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await sendContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <Container style={{ marginTop: '7em' }}>
      <Header as="h2">Contact Me</Header>
      <Form success={success} error={!!error} onSubmit={handleSubmit}>
        <Form.Input
          label="Name"
          placeholder="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Email"
          placeholder="Your Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Form.TextArea
          label="Message"
          placeholder="Your Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <Button type="submit" primary>
          Submit
        </Button>
        <Message
          success
          header="Message Sent"
          content="Thank you for reaching out. I'll get back to you soon!"
        />
        <Message error header="Error" content={error} />
      </Form>
    </Container>
  );
};

export default ContactPage;
