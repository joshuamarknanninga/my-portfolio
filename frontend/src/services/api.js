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
