// frontend/src/components/Orders/OrderConfirmation.js
import React, { useEffect, useState } from 'react';
import { Container, Header, List, Message, Loader, Segment, Divider } from 'semantic-ui-react';
import { fetchOrderById } from '../../services/api';
import { useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        const data = await fetchOrderById(id);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order.');
      }
      setLoading(false);
    };
    getOrder();
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

  if (!order) {
    return null;
  }

  return (
    <Container style={{ marginTop: '7em' }}>
      <Segment>
        <Header as="h2">Order Confirmation</Header>
        <p>Thank you for your purchase, {order.customerName}!</p>
        <p>Your order has been received and is being processed.</p>
        
        <Divider />

        <Header as="h3">Order Details</Header>
        <List divided relaxed>
          {order.products.map((item, index) => (
            <List.Item key={index}>
              <List.Icon name="check circle" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{item.productId.title}</List.Header>
                <List.Description>Quantity: {item.quantity}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        
        <Divider />

        <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </Segment>
    </Container>
  );
};

export default OrderConfirmation;
