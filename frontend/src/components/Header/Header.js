// frontend/src/components/Header/Header.js

import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
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
          <Menu.Item as={NavLink} to="/donations">
            Donate
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Header;
