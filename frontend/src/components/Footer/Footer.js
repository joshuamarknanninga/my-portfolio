// frontend/src/components/Footer/Footer.js
import React from 'react';
import { Container, Icon } from 'semantic-ui-react';

const Footer = () => (
  <footer style={{ padding: '2em 0', backgroundColor: '#f1f1f1', marginTop: '2em' }}>
    <Container textAlign="center">
      <Icon name="youtube" link />
      <Icon name="facebook" link />
      <Icon name="twitter" link />
      <Icon name="linkedin" link />
      <Icon name="wordpress" link />
      <Icon name="wix" link />
      <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;
