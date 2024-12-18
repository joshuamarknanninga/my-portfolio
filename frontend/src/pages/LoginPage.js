// frontend/src/pages/LoginPage.js

import React, { useState } from 'react';
import { Form, Button, Message, Container, Header } from 'semantic-ui-react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = await loginUser(formData);
      login(data.user); // Assuming the response contains a user object
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container text style={{ marginTop: '2em' }}>
      <Header as="h2">Login</Header>
      <Form onSubmit={handleSubmit} error={!!error}>
        <Form.Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
        <Button type="submit" primary>
          Login
        </Button>
        {error && <Message error header="Error" content={error} />}
      </Form>
    </Container>
  );
};

export default LoginPage;
