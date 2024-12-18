// frontend/src/components/GPTShowcase/GPTForm.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Message, Image, Container, Header } from 'semantic-ui-react';
import { createGPT, fetchGPTById, updateGPT } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GPTForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      setEditing(true);
      const getGPT = async () => {
        try {
          const data = await fetchGPTById(id);
          setFormData({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl || '',
          });
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch GPT details');
        }
      };
      getGPT();
    }
  }, [id]);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await updateGPT(id, formData);
        setSuccess('GPT updated successfully!');
      } else {
        await createGPT(formData);
        setSuccess('GPT created successfully!');
      }
      setError('');
      navigate('/gpts'); // Redirect to GPT list after success
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
      setSuccess('');
    }
  };

  return (
    <Container text style={{ marginTop: '2em' }}>
      <Header as="h2">{editing ? 'Edit GPT' : 'Create GPT'}</Header>
      <Form onSubmit={handleSubmit} error={!!error} success={!!success}>
        <Form.Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Form.TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {formData.imageUrl && (
          <Image src={formData.imageUrl} size="small" bordered style={{ marginBottom: '20px' }} />
        )}
        <Button type="submit" primary>
          {editing ? 'Update GPT' : 'Create GPT'}
        </Button>
        {error && <Message error header="Error" content={error} />}
        {success && <Message success header="Success" content={success} />}
      </Form>
    </Container>
  );
};

export default GPTForm;
