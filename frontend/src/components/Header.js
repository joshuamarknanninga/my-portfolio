// frontend/src/components/Header/Header.js
import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item header as={Link} to="/">
        My Portfolio
      </Menu.Item>
      <Menu.Item as={Link} to="/gpts">
        GPT Showcase
      </Menu.Item>
      <Menu.Item as={Link} to="/blogs">
        Blog
      </Menu.Item>
      <Menu.Item as={Link} to="/contact">
        Contact
      </Menu.Item>
      {/* Add social links or dropdowns if needed */}
    </Container>
  </Menu>
);

export default HeaderComponent;
