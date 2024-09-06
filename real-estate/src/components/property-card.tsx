// components/property-card.tsx

import React from 'react';
import Image from 'next/image';
import { Property } from '../pages/property/type'; // Adjust the import path if necessary

interface PropertyCardProps {
  property: Property;
}


const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="card mb-4">
      <Image
        src={property.images[0]} // Assuming the first image is used as the thumbnail
        className="card-img-top"
        alt={property.address}
        width={500}
        height={300}
        style={{ objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{property.address}</h5>
        <p className="card-text">Price: {property.price}</p>
        <p className="card-text">{property.description}</p>
        <a href={`mailto:${property.contactInfo}`} className="btn btn-primary">
          Contact
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
