// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchBlogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/blogs`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await axios.post(`${API_BASE_URL}/blogs`, blogData);
  return response.data;
};

export const fetchGPTs = async () => {
  const response = await axios.get(`${API_BASE_URL}/gpts`);
  return response.data;
};

export const createGPT = async (gptData) => {
  const response = await axios.post(`${API_BASE_URL}/gpts`, gptData);
  return response.data;
};

export const sendContact = async (contactData) => {
  const response = await axios.post(`${API_BASE_URL}/contact`, contactData);
  return response.data;
};

export const createPaymentIntent = async (donationData) => {
  const response = await axios.post(`${API_BASE_URL}/donations/create-payment-intent`, donationData);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
  return response.data;
};

// Authentication APIs (if implemented)
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
  return response.data;
};
