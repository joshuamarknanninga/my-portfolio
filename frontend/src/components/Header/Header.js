// frontend/src/components/Header/Header.js

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

const HeaderComponent = () => {
  const { user, logout } = useAuth(); // Destructure 'user' and 'logout'

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} exact="true" to="/" header>
          My Portfolio
        </Menu.Item>
        <Menu.Item as={NavLink} to="/blogs">
          Blogs
        </Menu.Item>
        <Menu.Item as={NavLink} to="/gpts">
          GPT Showcase
        </Menu.Item>
        <Menu.Item as={NavLink} to="/products">
          Products
        </Menu.Item>
        <Menu.Item as={NavLink} to="/contact">
          Contact
        </Menu.Item>
        <Menu.Menu position="right">
          {user ? (
            <>
              <Menu.Item as={NavLink} to="/donations">
                Donate
              </Menu.Item>
              <Menu.Item onClick={logout}>
                Logout
              </Menu.Item>
            </>
          ) : (
            <Menu.Item as={NavLink} to="/login">
              Login
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

// Add at the top of HeaderComponent
console.log('HeaderComponent - user:', user);

export default HeaderComponent;
