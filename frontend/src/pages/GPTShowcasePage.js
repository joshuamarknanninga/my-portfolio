// frontend/src/pages/GPTShowcasePage.js

import React, { useEffect, useState } from 'react';
import { fetchGPTs } from '../services/api';
import GPTCard from '../components/GPTCard/GPTCard';
import { Card, Container, Loader, Message, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GPTShowcasePage = () => {
  const [gpts, setGPTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getGPTs = async () => {
      try {
        const data = await fetchGPTs();
        setGPTs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch GPTs. Please try again later.');
        setLoading(false);
      }
    };

    getGPTs();
  }, []);

  const filteredGPTs = gpts.filter((gpt) =>
    gpt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gpt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container textAlign="center" style={{ marginTop: '2em' }}>
        <Loader active inline="centered" size="large">
          Loading GPTs...
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

  return (
    <Container style={{ marginTop: '2em' }}>
      {user && user.isAdmin && (
        <Button as={Link} to="/gpts/new" primary style={{ marginBottom: '1em' }}>
          Create New GPT
        </Button>
      )}
      
      {/* Search Input */}
      <Input
        icon="search"
        placeholder="Search GPTs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1em' }}
      />

      {filteredGPTs.length === 0 ? (
        <Message info>
          <Message.Header>No GPTs Found</Message.Header>
          <p>No GPTs match your search criteria.</p>
        </Message>
      ) : (
        <Card.Group itemsPerRow={4} stackable>
          {filteredGPTs.map((gpt) => (
            <GPTCard key={gpt._id} gpt={gpt} />
          ))}
        </Card.Group>
      )}
    </Container>
  );
};

export default GPTShowcasePage;
