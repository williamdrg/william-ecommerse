import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import './styles/createProduct.css';

const CreateProduct = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      products: [{ name: '', description: '', price: '', availableQty: '', categoryId: '', productImages: null }]
    }
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'products'
  });

  const token = localStorage.getItem('token');

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('products', JSON.stringify(data.products.map(({ productImages, ...rest }) => rest)));
    data.products.forEach((product, index) => {
      if (product.productImages[0]) {
        formData.append('productImages', product.productImages[0]);
      }
    });

    try {
      const response = await axios.post('https://api-ecommerce-ugum.onrender.com/products/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('Products created successfully:', response.data);
    } catch (error) {
      console.error('Error creating products:', error);
    }
  };

  return (
    <div className="create-product">
      <h2>Create Products</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="product-field">
            <h3>Product {index + 1}</h3>
            <label>
              Name:
              <input 
                type="text" 
                {...register(`products.${index}.name`, { required: 'Name is required' })}
              />
              {errors.products?.[index]?.name && <p>{errors.products[index].name.message}</p>}
            </label>
            <label>
              Description:
              <input 
                type="text" 
                {...register(`products.${index}.description`, { required: 'Description is required' })}
              />
              {errors.products?.[index]?.description && <p>{errors.products[index].description.message}</p>}
            </label>
            <label>
              Price:
              <input 
                type="number" 
                {...register(`products.${index}.price`, { required: 'Price is required' })}
              />
              {errors.products?.[index]?.price && <p>{errors.products[index].price.message}</p>}
            </label>
            <label>
              Available Quantity:
              <input 
                type="number" 
                {...register(`products.${index}.availableQty`, { required: 'Available Quantity is required' })}
              />
              {errors.products?.[index]?.availableQty && <p>{errors.products[index].availableQty.message}</p>}
            </label>
            <label>
              Category ID:
              <input 
                type="number" 
                {...register(`products.${index}.categoryId`, { required: 'Category ID is required' })}
              />
              {errors.products?.[index]?.categoryId && <p>{errors.products[index].categoryId.message}</p>}
            </label>
            <label>
              Image:
              <input 
                type="file" 
                {...register(`products.${index}.productImages`, { required: 'Image is required' })}
              />
              {errors.products?.[index]?.productImages && <p>{errors.products[index].productImages.message}</p>}
            </label>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: '', description: '', price: '', availableQty: '', categoryId: '', productImages: null })}>
          Add Another Product
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProduct;
