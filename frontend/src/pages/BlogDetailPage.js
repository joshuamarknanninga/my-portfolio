// frontend/src/pages/BlogDetailPage.js

import React, { useEffect, useState } from 'react';
import { fetchBlogById } from '../services/api';
import { useParams } from 'react-router-dom';
import { Container, Header, Image, Message, Loader } from 'semantic-ui-react';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch blog details');
        setLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (loading) {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Loader active inline="centered" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">{blog.title}</Header>
      {blog.imageUrl && <Image src={blog.imageUrl} size="large" bordered />}
      <p style={{ marginTop: '1em' }}>{blog.content}</p>
    </Container>
  );
};

export default BlogDetailPage;
