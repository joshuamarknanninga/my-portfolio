// frontend/src/services/api.js

import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// -----------------------------
// User Authentication APIs
// -----------------------------

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// -----------------------------
// Contact Form API
// -----------------------------

export const sendContact = async (contactData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contact`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

// -----------------------------
// Blog APIs
// -----------------------------

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

// -----------------------------
// GPT APIs
// -----------------------------

/**
 * Fetches all GPT entries from the backend.
 * @returns {Promise<Array>} An array of GPT objects.
 */
export const fetchGPTs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gpts`);
    return response.data; // Assuming the API returns an array of GPTs
  } catch (error) {
    console.error('Error fetching GPTs:', error);
    throw error;
  }
};

/**
 * Fetches a single GPT entry by its ID.
 * @param {string} id - The ID of the GPT to fetch.
 * @returns {Promise<Object>} The GPT object.
 */
export const fetchGPTById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gpts/${id}`);
    return response.data; // Assuming the API returns a GPT object
  } catch (error) {
    console.error(`Error fetching GPT with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new GPT entry.
 * @param {Object} gptData - The data for the new GPT.
 * @returns {Promise<Object>} The created GPT object.
 */
export const createGPT = async (gptData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gpts`, gptData);
    return response.data; // Assuming the API returns the created GPT object
  } catch (error) {
    console.error('Error creating GPT:', error);
    throw error;
  }
};

/**
 * Updates an existing GPT entry by its ID.
 * @param {string} id - The ID of the GPT to update.
 * @param {Object} gptData - The updated data for the GPT.
 * @returns {Promise<Object>} The updated GPT object.
 */
export const updateGPT = async (id, gptData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/gpts/${id}`, gptData);
    return response.data; // Assuming the API returns the updated GPT object
  } catch (error) {
    console.error(`Error updating GPT with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a GPT entry by its ID.
 * @param {string} id - The ID of the GPT to delete.
 * @returns {Promise<Object>} A confirmation message.
 */
export const deleteGPT = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/gpts/${id}`);
    return response.data; // Assuming the API returns a confirmation message
  } catch (error) {
    console.error(`Error deleting GPT with ID ${id}:`, error);
    throw error;
  }
};

// -----------------------------
// Product APIs
// -----------------------------

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// -----------------------------
// Order APIs
// -----------------------------

export const fetchOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};

// -----------------------------
// Payment APIs
// -----------------------------

export const createPaymentIntent = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments/create`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};
