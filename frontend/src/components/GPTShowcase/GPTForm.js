// frontend/src/components/GPTShowcase/GPTForm.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Message, Image } from 'semantic-ui-react';
import { createGPT, fetchGPTById, updateGPT } from '../../services/api';
import { useHistory, useParams } from 'react-router-dom';

const GPTForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);
  
  const history = useHistory();
  const { id } = useParams(); // For editing existing GPT

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
          setError(err.message || 'Failed to fetch GPT details');
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
      history.push('/gpts'); // Redirect to GPT list
    } catch (err) {
      setError(err.message || 'Operation failed');
      setSuccess('');
    }
  };

  return (
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
  );
};

export default GPTForm;
