// src/models/property.model.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the Property document
interface IProperty extends Document {
  address: string;
  price: number;
  description: string;
  images: string[];
  user: mongoose.Schema.Types.ObjectId; // Reference to the User who listed the property
  favorites: mongoose.Schema.Types.ObjectId[]; // Array of User references who favorited the property
  contactInfo: string;
}

// Define the schema for the Property model
const propertySchema: Schema<IProperty> = new Schema({
  address: { type: String, required: true },  // Property address
  price: { type: Number, required: true }, // Property price
  description: { type: String, required: true }, // Property description
  images: [String], // Array of image URLs
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User who listed the property
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Array of User references who favorited the property
    }
  ],
  contactInfo: { type: String, required: true }, // Contact information for inquiries
});

// Create the Property model from the schema and export it
const Property: Model<IProperty> = mongoose.model<IProperty>('Property', propertySchema);

export default Property;
