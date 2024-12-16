// frontend/src/pages/GPTShowcasePage.js
import React, { useEffect, useState } from 'react';
import { Container, Header, Card } from 'semantic-ui-react';
import { fetchGPTs } from '../services/api';

const GPTShowcasePage = () => {
  const [gpts, setGPTs] = useState([]);

  useEffect(() => {
    const getGPTs = async () => {
      const data = await fetchGPTs();
      setGPTs(data);
    };
    getGPTs();
  }, []);

  return (
    <Container style={{ marginTop: '7em' }}>
      <Header as="h2">GPT Showcase</Header>
      <Card.Group>
        {gpts.map((gpt) => (
          <Card key={gpt._id}>
            <Card.Content>
              <Card.Header>{gpt.name}</Card.Header>
              <Card.Description>{gpt.description}</Card.Description>
            </Card.Content>
            {/* Add Card.Content extra with links or actions if needed */}
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default GPTShowcasePage;
