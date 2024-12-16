// frontend/src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Container, Header, Card, Loader, Message } from 'semantic-ui-react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/Products/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
      }
      setLoading(false);
    };
    getProducts();
  }, []);
  
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
      <Header as="h2">AI Creations for Sale</Header>
      <Card.Group itemsPerRow={3} stackable>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Card.Group>
    </Container>
  );
};

export default ProductsPage;
