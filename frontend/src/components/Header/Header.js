// frontend/src/components/Header/Header.js

import React from 'react';
import { Menu, Container, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HeaderComponent = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>My Portfolio</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Loader active inline="centered" size="small" />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          My Portfolio
        </Menu.Item>

        {/* Visible to all users */}
        <Menu.Item as={Link} to="/gpts">
          GPT Showcase
        </Menu.Item>
        <Menu.Item as={Link} to="/blogs">
          Blogs
        </Menu.Item>
        <Menu.Item as={Link} to="/contact">
          Contact
        </Menu.Item>
        <Menu.Item as={Link} to="/products">
          Products
        </Menu.Item>

        {/* Right Menu */}
        <Menu.Menu position="right">
          {user ? (
            <>
              {/* Admin-only Menu Items */}
              {user.isAdmin && (
                <Menu.Item as={Link} to="/gpts/new">
                  Create GPT
                </Menu.Item>
              )}
              <Menu.Item onClick={logout}>
                Logout ({user.name})
              </Menu.Item>
            </>
          ) : (
            <Menu.Item as={Link} to="/login">
              Login
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default HeaderComponent;
