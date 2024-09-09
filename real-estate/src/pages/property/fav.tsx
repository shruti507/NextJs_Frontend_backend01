  // Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'; // Use Next.js router
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Style.module.css'; // Adjust path as needed
import Image from 'next/image';

// Define TypeScript types for properties
interface Property {
  _id: string;
  address: string;
  price: number;
  description: string;
  images: string;
}

// Define the functional component
const Favorite = () => {
  const [favorites, setFavorites] = useState<Property[]>([]); // State for favorites
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const router = useRouter(); // Next.js router
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userId) {
          const response = await axios.post<Property[]>(
            
            `${process.env.NEXT_PUBLIC_PROPERTY_VIEW_FAVORITES_URL}`, { userId }
          );
          setFavorites(response.data);  // Update favorites
          console.log(response.data[0]);  // Update favorites
        } else {
          router.push('/login'); // Redirect to login if userId is not available
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        Swal.fire('Error!', 'Failed to fetch favorite properties.', 'error');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFavorites();
  }, [router, userId]);

  // Function to handle deletion of a property from favorites
  const handleDelete = async (propertyId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action will remove the property from your favorites.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:3000/properties/deleteProperty/${propertyId}/${userId}`
        );

        if (response.status === 200) {
          Swal.fire('Deleted!', 'The property has been removed from your favorites.', 'success');
          setFavorites(prevFavorites => prevFavorites.filter(property => property._id !== propertyId));
        }
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
      Swal.fire('Error!', 'Failed to delete the property. Please try again.', 'error');
      console.log(error)
    }
  };

  // Display loading message while data is being fetched
  if (loading) {
    return <div className="container mt-5"><p>Loading favorites...</p></div>;
  }

  return (
    <div className="container-lg mt-5 p-4 mb-5 bg-light rounded">
      <h2 className="mb-4">Your Favorite Properties</h2>
      <div className="row">
        {favorites.length === 0 ? (
          <div className="col-12 text-center">
            <p>You have no favorite properties.</p>
          </div>
        ) : (
          favorites.map(property => (
            <div className="col-md-4 mb-4" key={property._id}>
              <div className="card shadow-sm border-light">
               <Image
                  src={property.images[0]}
                  alt={property.address || 'Property Image'}
                  width={500}
                  height={200}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.address}</h5>
                  <p className="card-text price-text">Price: Rs. {property.price}</p>
                  <p className="card-text">
                    <strong>Description:</strong> {property.description.length > 200
                      ? `${property.description.slice(0, 200)}...`
                      : property.description
                    }
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-secondary" onClick={() => handleDelete(property._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorite;
