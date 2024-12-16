// frontend/src/pages/BlogPage.js
import React, { useEffect, useState } from 'react';
import { Container, Header, Card } from 'semantic-ui-react';
import { fetchBlogs } from '../services/api';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  return (
    <Container style={{ marginTop: '7em' }}>
      <Header as="h2">Blog</Header>
      <Card.Group>
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <Card.Content>
              <Card.Header>{blog.title}</Card.Header>
              <Card.Meta>{new Date(blog.date).toLocaleDateString()}</Card.Meta>
              <Card.Description>{blog.content.substring(0, 100)}...</Card.Description>
            </Card.Content>
            {/* Add Card.Content extra with a "Read More" link if needed */}
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default BlogPage;
