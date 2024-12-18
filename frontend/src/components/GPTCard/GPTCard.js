// frontend/src/components/GPTCard/GPTCard.js

import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GPTCard = ({ gpt }) => {
  return (
    <Card>
      {gpt.imageUrl && <Image src={gpt.imageUrl} wrapped ui={false} alt={gpt.name} />}
      <Card.Content>
        <Card.Header>{gpt.name}</Card.Header>
        <Card.Description>
          {gpt.description.length > 100
            ? `${gpt.description.substring(0, 100)}...`
            : gpt.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as={Link} to={`/gpts/${gpt._id}`} primary>
          View Details
        </Button>
      </Card.Content>
    </Card>
  );
};

GPTCard.propTypes = {
  gpt: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default GPTCard;
