import { useState } from 'react';
import axios from 'axios';
import urlBase from '../utils/urlBase';
import { useDispatch } from 'react-redux';
import { showModal } from '../store/slices/modal.slice';
import { setLoading } from '../store/slices/loader.slice';

const useAuth = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  const authenticate = async (patch, data) => {
    const url = `${urlBase}${patch}`;

    try {
      dispatch(setLoading(true));
      const response = await axios.post(url, data);
      if ('token' in response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
      }
      return response.data;
    } catch (err) {
      console.error(err);
      if (err.response) {
        dispatch(showModal({ message: err.response.data.message, type: 'error' }));
        setError(err.response.data.message.join(', '));
        throw new Error(err.response.data.message.join(', '));
      } else if (err.request) {
        dispatch(showModal({ message: 'No response received from the server.', type: 'error' }));
        setError('No response received from the server.');
        throw new Error('No response received from the server.');
      } else {
        dispatch(showModal({ message: 'Error in setting up the request.', type: 'error' }));
        setError('Error in setting up the request.');
        throw new Error('Error in setting up the request.');
      }
    } finally {
      dispatch(setLoading(false));
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
