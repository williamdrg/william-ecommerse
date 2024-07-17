import { useState } from 'react';
import axios from 'axios';
import urlBase from '../utils/urlBase';

const useAuth = () => {
  const [error, setError] = useState(null);

  const authenticate = async (patch, data) => {
    const url = `${urlBase}${patch}`;

    try {
      const response = await axios.post(url, data);
      if ('token' in response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
      }
      return response.data;
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message.join(', '));
        throw new Error(err.response.data.message.join(', '));
      } else if (err.request) {
        setError('No response received from the server.');
        throw new Error('No response received from the server.');
      } else {
        setError('Error in setting up the request.');
        throw new Error('Error in setting up the request.');
      }
    }
  };

  const registerUser = async (patch, data) => {
    const url = `${urlBase}${patch}`;

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message.join(', '));
        throw new Error(err.response.data.message.join(', '));
      } else if (err.request) {
        setError('No response received from the server.');
        throw new Error('No response received from the server.');
      } else {
        setError('Error in setting up the request.');
        throw new Error('Error in setting up the request.');
      }
    }
  };

  const submitPassword = async (data) => {
    const url = `${urlBase}/request_password`;
    try {
      const response = await axios.post(url, data);
  
      return response.data;
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message.join(', '));
        throw new Error(err.response.data.message.join(', '));
      } else if (err.request) {
        setError('No response received from the server.');
        throw new Error('No response received from the server.');
      } else {
        setError('Error in setting up the request.');
        throw new Error('Error in setting up the request.');
      }
    }
  }

  const resetPassword = async (data) => {
    const url = `${urlBase}/update_password`;
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message.join(', '));
        throw new Error(err.response.data.message.join(', '));
      } else if (err.request) {
        setError('No response received from the server.');
        throw new Error('No response received from the server.');
      } else {
        setError('Error in setting up the request.');
        throw new Error('Error in setting up the request.');
      }
    }
  };

  return { authenticate, registerUser, submitPassword, resetPassword, error };
};

export default useAuth;
