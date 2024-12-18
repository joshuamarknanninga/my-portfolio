// frontend/src/services/api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Product APIs
export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// Blog APIs
export const fetchBlogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/blogs`);
  return response.data;
};

// Contact APIs
export const sendContact = async (contactData) => {
  const response = await axios.post(`${API_BASE_URL}/contact`, contactData);
  return response.data;
};

// GPT APIs
export const fetchGPTs = async () => {
  const response = await axios.get(`${API_BASE_URL}/gpts`);
  return response.data;
};

export const fetchGPTById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/gpts/${id}`);
  return response.data;
};

export const createGPT = async (gptData) => {
  const response = await axios.post(`${API_BASE_URL}/gpts`, gptData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateGPT = async (id, gptData) => {
  const response = await axios.put(`${API_BASE_URL}/gpts/${id}`, gptData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteGPT = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/gpts/${id}`);
  return response.data;
};

// Order APIs
export const createPaymentIntent = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/orders/create-payment-intent`, orderData);
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
  return response.data;
};

// Authentication APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
  return response.data;
};

// Add more API functions as needed
