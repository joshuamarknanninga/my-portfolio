// frontend/src/components/GPTShowcase/GPTList.js

import React, { useEffect, useState } from 'react';
import { fetchGPTs } from '../../services/api';
import { Card, Loader, Message, Button } from 'semantic-ui-react';
import GPTCard from './GPTCard';
import { Link } from 'react-router-dom';

const GPTList = () => {
  const [gpts, setGpts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // For admin functionalities (optional)
  const [admin, setAdmin] = useState(false); // Implement admin check as needed

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
  }, []);

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
