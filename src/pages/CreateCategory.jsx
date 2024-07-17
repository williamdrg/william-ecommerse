import React, { useState } from 'react';
import axios from 'axios';
import './styles/createCategory.css'
import bearerToken from '../utils/bearerToken';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api-ecommerce-ugum.onrender.com/categories', { name }, bearerToken());
      setMessage('Category created successfully');
      setName('');
      console.log('Category created successfully:', response.data);
    } catch (error) {
      setMessage('Error creating category');
      console.error('Error creating category:', error);
    }

  };

  return (
    <div className="create-category">
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="category-field">
          <label>
            Category Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </label>
          <button type="submit">Submit</button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CreateCategory;