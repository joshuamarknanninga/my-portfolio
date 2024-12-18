// frontend/src/pages/GPTDetailPage.js

import React, { useEffect, useState } from 'react';
import { fetchGPTById, deleteGPT } from '../services/api';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Header, Image, Button, Message, Confirm } from 'semantic-ui-react';

const GPTDetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  
  const [gpt, setGPT] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  // For admin functionalities (optional)
  const [admin, setAdmin] = useState(false); // Implement admin check as needed

  useEffect(() => {
    const getGPT = async () => {
      try {
        const data = await fetchGPTById(id);
        setGPT(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch GPT details');
        setLoading(false);
      }
    };

    getGPT();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteGPT(id);
      history.push('/gpts');
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete GPT');
    }
  };

  if (loading) return <Container><Message info>Loading...</Message></Container>;

  if (error) return <Container><Message negative>{error}</Message></Container>;

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">{gpt.title}</Header>
      {gpt.imageUrl && <Image src={gpt.imageUrl} size="large" bordered />}
      <p style={{ marginTop: '1em' }}>{gpt.description}</p>
      
      {admin && (
        <>
          <Button as={Link} to={`/gpts/${id}/edit`} primary>
            Edit
          </Button>
          <Button color="red" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
          {deleteError && <Message negative>{deleteError}</Message>}
          <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleDelete}
            content="Are you sure you want to delete this GPT entry?"
          />
        </>
      )}
    </Container>
  );
};

export default GPTDetailPage;
