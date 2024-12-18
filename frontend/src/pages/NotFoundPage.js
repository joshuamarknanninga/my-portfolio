// frontend/src/pages/NotFoundPage.js

import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Header as="h2">404 - Page Not Found</Header>
      <p>The page you are looking for does not exist.</p>
      <Button as={Link} to="/" primary>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
