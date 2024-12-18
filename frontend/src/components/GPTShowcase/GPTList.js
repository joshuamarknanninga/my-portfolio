// frontend/src/components/GPTShowcase/GPTList.js

import React, { useEffect, useState } from 'react';
import { fetchGPTs } from '../../services/api';
import { Card, Loader, Message, Button } from 'semantic-ui-react';
import GPTCard from './GPTCard';
import { Link } from 'react-router-dom';

// Import authentication context or hooks as needed
// Example: import { useAuth } from '../../contexts/AuthContext';

const GPTList = () => {
  const [gpts, setGpts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Example: Get admin status from auth context
  // const { user } = useAuth();
  const [admin, setAdmin] = useState(false); // Replace with actual admin check

  useEffect(() => {
    const getGPTs = async () => {
      try {
        const data = await fetchGPTs();
        setGpts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch GPTs');
        setLoading(false);
      }
    };

    getGPTs();

    // Example: Set admin status based on user role
    // if (user && user.isAdmin) setAdmin(true);
    // else setAdmin(false);
  }, []); // Add dependencies as needed

  if (loading) return <Loader active inline="centered" />;

  if (error) return <Message negative>{error}</Message>;

  return (
    <>
      {admin && (
        <Button as={Link} to="/gpts/new" primary style={{ marginBottom: '20px' }}>
          Add New GPT
        </Button>
      )}
      <Card.Group>
        {gpts.map((gpt) => (
          <GPTCard key={gpt._id} gpt={gpt} />
        ))}
      </Card.Group>
    </>
  );
};

export default GPTList;
