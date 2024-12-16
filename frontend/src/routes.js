// frontend/src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import GPTShowcasePage from './pages/GPTShowcasePage';
import DonationsPage from './pages/DonationsPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const AppRoutes = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/gpts" element={<GPTShowcasePage />} />
      <Route path="/donations" element={<DonationsPage />} />
      {/* Add more routes as needed */}
    </Routes>
    <Footer />
  </Router>
);

export default AppRoutes;
