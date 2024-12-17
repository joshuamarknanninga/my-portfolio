// frontend/src/components/Footer/Footer.js
import React from 'react';
import { Container, Icon, Button } from 'semantic-ui-react';
import BuyMeACoffeeButton from '../Donations/BuyMeACoffeeButton';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ padding: '2em 0', backgroundColor: '#f1f1f1', marginTop: '2em' }}>
    <Container textAlign="center">
      <Icon name="youtube" link />
      <Icon name="facebook" link />
      <Icon name="twitter" link />
      <Icon name="linkedin" link />
      <Icon name="wordpress" link />
      <Icon name="wix" link />
      <div style={{ marginTop: '1em' }}>
        <BuyMeACoffeeButton />
      </div>
      <Button as={Link} to="/products" basic color="black" style={{ marginTop: '1em' }}>
        Visit Our Store
      </Button>
      <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;
