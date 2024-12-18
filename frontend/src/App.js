// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import GPTShowcasePage from './pages/GPTShowcasePage';
import GPTDetailPage from './pages/GPTDetailPage';
import DonationsPage from './pages/DonationsPage';
import CheckoutPage from './pages/CheckoutPage';
import GPTForm from './components/GPTShowcase/GPTForm'; // For admin
import NotFoundPage from './pages/NotFoundPage'; // Optional: 404 page

const App = () => {
  return (
    <Router>
      <Header />
      <Container style={{ marginTop: '7em', minHeight: '80vh' }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/blogs" component={BlogPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} /> {/* Ensure BlogDetailPage exists */}
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/gpts" component={GPTShowcasePage} />
          <Route exact path="/gpts/new" component={GPTForm} /> {/* Protected Route for Admin */}
          <Route exact path="/gpts/:id" component={GPTDetailPage} /> {/* Ensure GPTDetailPage exists */}
          <Route exact path="/donations" component={DonationsPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route component={NotFoundPage} /> {/* Catch-all route */}
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
