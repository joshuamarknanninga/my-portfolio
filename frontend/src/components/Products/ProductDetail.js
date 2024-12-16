// frontend/src/components/Products/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { Container, Image, Header, Button, Segment, Loader, Message, Grid } from 'semantic-ui-react';
import { fetchProductById } from '../../services/api';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product.');
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <Container textAlign="center" style={{ marginTop: '7em' }}>
        <Loader active inline="centered" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container textAlign="center" style={{ marginTop: '7em' }}>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '7em' }}>
      <Segment>
        <Grid stackable>
          {product.imageUrl && (
            <Grid.Column width={8}>
              <Image src={product.imageUrl} size="large" />
            </Grid.Column>
          )}
          <Grid.Column width={product.imageUrl ? 8 : 16}>
            <Header as="h2">{product.title}</Header>
            <Header as="h4" color="grey">
              {product.category} - ${product.price.toFixed(2)}
            </Header>
            <p>{product.description}</p>
            <Button
              color="green"
              onClick={() => navigate('/checkout', { state: { products: [{ productId: product._id, quantity: 1 }] } })}
            >
              Buy Now
            </Button>
            {product.fileUrl && (
              <Button
                as="a"
                href={product.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="blue"
                style={{ marginLeft: '1em' }}
              >
                Download Sample
              </Button>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};

export default ProductDetail;
