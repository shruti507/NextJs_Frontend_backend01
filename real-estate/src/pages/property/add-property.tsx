// Import necessary modules
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../components/header'; // Adjust the import path
import { useRouter } from 'next/router';


// Define the types for the state variables
interface PropertyFormValues {
  address: string;
  price: string;
  description: string;
  images: string;
  contactInfo: string;
}

// Main component
const AddProperty = () => {
  // State variables for form fields and token
  const [formValues, setFormValues] = useState<PropertyFormValues>({
    address: '',
    price: '',
    description: '',
    images: '',
    contactInfo: ''
  });
  const [token, setToken] = useState<string | null>(null); // Token state
  const router = useRouter(); // Next.js router
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

  // Effect to retrieve token from localStorage or redirect to login
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login'); // Redirect to login if user is not authenticated
    } else {
      setToken(storedToken);
    }
  }, [router]);

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      Swal.fire({
        title: 'Error!',
        text: 'User is not authenticated. Please log in.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PROPERTY_ADD_URL}`,
        {
          ...formValues,
          user: userId
        },
        {
          headers: {
            'token': token // Include the token in the 'token' header
          }
        }
      );
      Swal.fire({
        title: 'Success!',
        text: 'Property added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Reset form fields after successful submission
      setFormValues({
        address: '',
        price: '',
        description: '',
        images: '',
        contactInfo: ''
      });

      route.push('/');
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.msg || 'Failed to add property. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('There was an error adding the property!', error);
    }
  };

  // Handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
  };

  const route = useRouter();

  return (
    <>
      
      <div className="container border mb-3 p-4" style={{ marginTop: '100px' }}>
        <h2>Add Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={formValues.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={formValues.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={formValues.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Images (comma-separated URLs)</label>
            <input
              type="text"
              className="form-control"
              id="images"
              value={formValues.images}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactInfo" className="form-label">Contact Info</label>
            <input
              type="text"
              className="form-control"
              id="contactInfo"
              value={formValues.contactInfo}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Property</button>
        </form>
      </div>
    </>
  );
};

export default AddProperty;
