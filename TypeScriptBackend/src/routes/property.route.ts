import express, { Request, Response, NextFunction } from 'express';
import auth from '../middleware/auth'; // Update to TypeScript import
import {
  createProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
  markAsFavorite,
  getFavorites,
  searchProperties,
  unmarkAsFavorite,
  createMultipleProperties,
  addProperty,
  viewPropertyOfParticularUser
} from '../controller/property.controller'; // Update to TypeScript import

const router = express.Router(); // Initialize router

// Route to create a new property
router.post("/createProperty", createProperty);

// Route to add a property with authentication middleware
router.post("/add-property", auth, addProperty);

// Route to get all properties
router.get("/viewProperties", getAllProperties);

// Route to search for properties
router.get("/searchProperties", searchProperties);

// Route to mark a property as favorite
router.post("/favorite", markAsFavorite);

// Route to get all favorite properties of a user
router.post("/viewFavourites", getFavorites);

// Route to unmark a property as favorite
router.delete("/deleteProperty/:propertyId/:userId", unmarkAsFavorite);

// Route to add properties in bulk
router.post("/add-property-in-bulk", createMultipleProperties);

// Route to get properties of a particular user
router.post("/view-property-of-user", viewPropertyOfParticularUser);

// Route to update a property by ID
router.put('/updateProperty/:id', updateProperty);

// Route to delete a property from user's property
router.delete("/removeProperty/:propertyId", deleteProperty);

// Export the router
export default router;
