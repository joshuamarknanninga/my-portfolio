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
import DonationsPage from './pages/DonationsPage';
import CheckoutPage from './pages/CheckoutPage';
import GPTForm from './components/GPTShowcase/GPTForm';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container style={{ marginTop: '7em', minHeight: '80vh' }}>
          <Switch>
            {/* ... existing routes */}
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/gpts" component={GPTShowcasePage} />
            <ProtectedRoute exact path="/gpts/new" component={GPTForm} adminOnly={true} />
            <Route exact path="/gpts/:id" component={GPTDetailPage} />
            {/* ... existing routes */}
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
};


export default App;
