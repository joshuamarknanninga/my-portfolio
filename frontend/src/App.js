// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage'; // Ensure this exists
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import GPTShowcasePage from './pages/GPTShowcasePage';
import GPTDetailPage from './pages/GPTDetailPage';
import DonationsPage from './pages/DonationsPage';
import CheckoutPage from './pages/CheckoutPage';
import GPTForm from './components/GPTShowcase/GPTForm';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <Container style={{ marginTop: '7em', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/gpts" element={<GPTShowcasePage />} />
          <Route path="/gpts/:id" element={<GPTDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protected Routes */}
          <Route
            path="/gpts/new"
            element={
              <ProtectedRoute adminOnly={true}>
                <GPTForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gpts/:id/edit"
            element={
              <ProtectedRoute adminOnly={true}>
                <GPTForm />
              </ProtectedRoute>
            }
          />
          {/* Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
