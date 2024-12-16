// frontend/src/components/Donations/BuyMeACoffeeButton.js
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const BuyMeACoffeeButton = () => (
  <Button
    color="yellow"
    icon
    labelPosition="left"
    href="https://www.buymeacoffee.com/yourprofile" // Replace with your Buy Me a Coffee link
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon name="coffee" />
    Buy Me a Coffee
  </Button>
);

export default BuyMeACoffeeButton;
