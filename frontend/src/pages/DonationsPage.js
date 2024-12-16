// frontend/src/pages/DonationsPage.js
import React from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';
import BuyMeACoffeeButton from '../components/Donations/BuyMeACoffeeButton';
import StripeDonationForm from '../components/Donations/StripeDonationForm';

const DonationsPage = () => (
  <Container style={{ marginTop: '7em' }}>
    <Header as="h2">Donations</Header>
    <p>Your support helps me continue creating and maintaining this portfolio. Thank you!</p>
    
    <Divider />

    {/* Buy Me a Coffee Section */}
    <Header as="h3">Buy Me a Coffee</Header>
    <BuyMeACoffeeButton />

    <Divider />

    {/* Stripe Donation Form Section */}
    <Header as="h3">Stripe Donation</Header>
    <StripeDonationForm />
  </Container>
);

export default DonationsPage;
