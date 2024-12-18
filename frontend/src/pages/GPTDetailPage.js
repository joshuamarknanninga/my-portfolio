// frontend/src/pages/GPTDetailPage.js

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchGPTById, deleteGPT } from '../services/api';
import { Container, Header, Image, Loader, Message, Button, Modal } from 'semantic-ui-react';
import { useAuth } from '../contexts/AuthContext';

const GPTDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [gpt, setGPT] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getGPT = async () => {
      try {
        const data = await fetchGPTById(id);
        setGPT(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch GPT details. Please try again later.');
        setLoading(false);
      }
    };

    getGPT();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteGPT(id);
      setLoading(false);
      navigate('/gpts');
    } catch (err) {
      setError('Failed to delete GPT. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container textAlign="center" style={{ marginTop: '2em' }}>
        <Loader active inline="centered" size="large">
          Loading GPT Details...
        </Loader>
      </Container>
    );
  }

  if (error) {
    return (
      <Container textAlign="center" style={{ marginTop: '2em' }}>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      </Container>
    );
  }

  if (!gpt) {
    return (
      <Container textAlign="center" style={{ marginTop: '2em' }}>
        <Message warning>
          <Message.Header>No GPT Found</Message.Header>
          <p>The GPT you are looking for does not exist.</p>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">{gpt.name}</Header>
      {gpt.imageUrl && <Image src={gpt.imageUrl} size="large" bordered alt={gpt.name} />}
      <p style={{ marginTop: '1em' }}>{gpt.description}</p>
      {/* Add more GPT details here if available */}
      
      {user && user.isAdmin && ( // Admin Controls
        <>
          <Button as={Link} to={`/gpts/${gpt._id}/edit`} primary style={{ marginTop: '1em' }}>
            Edit GPT
          </Button>
          <Button
            color="red"
            style={{ marginTop: '1em', marginLeft: '0.5em' }}
            onClick={() => setModalOpen(true)}
          >
            Delete GPT
          </Button>

          {/* Delete Confirmation Modal */}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            size="small"
          >
            <Header icon="trash" content="Delete GPT" />
            <Modal.Content>
              <p>Are you sure you want to delete this GPT?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={handleDelete}>
                <i className="remove icon"></i> Delete
              </Button>
              <Button onClick={() => setModalOpen(false)}>
                <i className="checkmark icon"></i> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </>
      )}
      
      <Button as={Link} to="/gpts" primary style={{ marginTop: '1em', marginLeft: '0.5em' }}>
        Back to GPT Showcase
      </Button>
    </Container>
  );
};

export default GPTDetailPage;
