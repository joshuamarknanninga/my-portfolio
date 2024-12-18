// frontend/src/components/GPTShowcase/GPTCard.js

import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const GPTCard = ({ gpt }) => {
  return (
    <Card>
      {gpt.imageUrl && <Image src={gpt.imageUrl} wrapped ui={false} />}
      <Card.Content>
        <Card.Header>{gpt.title}</Card.Header>
        <Card.Description>{gpt.description.substring(0, 100)}...</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as={Link} to={`/gpts/${gpt._id}`} primary>
          View Details
        </Button>
      </Card.Content>
    </Card>
  );
};

export default GPTCard;
