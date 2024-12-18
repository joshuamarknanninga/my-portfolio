// frontend/src/pages/GPTShowcasePage.js

import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import GPTList from '../components/GPTShowcase/GPTList';

const GPTShowcasePage = () => {
  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2" dividing>
        GPT Showcase
      </Header>
      <GPTList />
    </Container>
  );
};

export default GPTShowcasePage;
