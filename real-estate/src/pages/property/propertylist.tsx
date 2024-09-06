// pages/properties/index.tsx

"use client"; // Mark this file as a client component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Property } from './type'; // Adjust the import path if necessary
import PropertyCard from '../../components/property-card'; // Adjust the import path if necessary

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = sessionStorage.getItem('token') || '';
        const userId:any = localStorage.getItem("userId")
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PROPERTY_VIEW_USER_URL}`, {userId:userId} );

        setProperties(response.data);
      } catch (error: any) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-lg mt-5 shadow-lg p-4 mb-5 bg-white rounded">
      <div className="row">
        {properties.map((property) => (
          <div className="col-md-4" key={property._id}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
