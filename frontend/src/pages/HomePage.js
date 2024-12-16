// frontend/src/pages/HomePage.js
import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

const HomePage = () => (
  <Container style={{ marginTop: '7em' }}>
    <Segment>
      <Header as="h1">Welcome to My Portfolio</Header>
      <p>Explore my creations, blogs, and GPT showcases.</p>
      {/* Add more content like a hero image or introduction */}
    </Segment>
  </Container>
);

export default HomePage;
