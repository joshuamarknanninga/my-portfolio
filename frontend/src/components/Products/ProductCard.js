// frontend/src/components/Products/ProductCard.js
import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Card>
    {product.imageUrl && <Image src={product.imageUrl} wrapped ui={false} />}
    <Card.Content>
      <Card.Header>{product.title}</Card.Header>
      <Card.Meta>{product.category}</Card.Meta>
      <Card.Description>
        {product.description.substring(0, 100)}...
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <span style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</span>
      <Button
        as={Link}
        to={`/products/${product._id}`}
        primary
        floated="right"
        size="small"
      >
        View
      </Button>
    </Card.Content>
  </Card>
);

export default ProductCard;
