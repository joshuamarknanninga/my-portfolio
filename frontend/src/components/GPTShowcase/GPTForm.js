// frontend/src/components/GPTShowcase/GPTForm.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createGPT, updateGPT, fetchGPTById } from '../../services/api'; // Ensure these functions are correctly exported
import { Form, Button, Container, Header, Message, Image } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthContext';

const GPTForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { user } = useAuth();

  const [gptData, setGPTData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    // ... other fields as necessary
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditMode) {
      // Ensure only admins can edit
      if (!user || !user.isAdmin) {
        setError('Unauthorized access.');
        return;
      }

      setLoading(true);
      fetchGPTById(id)
        .then((data) => {
          setGPTData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch GPT details.');
          setLoading(false);
        });
    }
  }, [id, isEditMode, user]);

  const handleChange = (e, { name, value }) => {
    setGPTData({ ...gptData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isEditMode) {
        await updateGPT(id, gptData);
        setSuccess('GPT updated successfully!');
      } else {
        await createGPT(gptData);
        setSuccess('GPT created successfully!');
        setGPTData({ name: '', description: '', imageUrl: '' }); // Reset form
      }
      setLoading(false);
      navigate('/gpts'); // Redirect to GPT Showcase after success
    } catch (err) {
      setError('An error occurred while saving the GPT.');
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">{isEditMode ? 'Edit GPT' : 'Create New GPT'}</Header>
      {error && <Message negative>{error}</Message>}
      {success && <Message positive>{success}</Message>}
      <Form onSubmit={handleSubmit} loading={loading}>
        <Form.Input
          label="Name"
          placeholder="Enter GPT name"
          name="name"
          value={gptData.name}
          onChange={handleChange}
          required
        />
        <Form.TextArea
          label="Description"
          placeholder="Enter GPT description"
          name="description"
          value={gptData.description}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Image URL"
          placeholder="Enter image URL"
          name="imageUrl"
          value={gptData.imageUrl}
          onChange={handleChange}
        />
        {/* Add more form fields as needed */}
        <Button type="submit" primary>
          {isEditMode ? 'Update GPT' : 'Create GPT'}
        </Button>
        <Button type="button" onClick={() => navigate('/gpts')}>
          Cancel
        </Button>
      </Form>
      {gptData.imageUrl && (
        <Image src={gptData.imageUrl} size="medium" bordered style={{ marginTop: '1em' }} alt={gptData.name} />
      )}
    </Container>
  );
};

export default GPTForm;
