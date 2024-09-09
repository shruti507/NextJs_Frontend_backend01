// Import necessary modules and functions
import express, { Router } from "express";
import { register, registerMultipleUsers, signIn } from "../controller/user.controller";
// import auth from '../middleware/auth'; // Adjust import path if necessary

// Initialize router
const router: Router = express.Router();

// Route for user registration
router.post("/register", register);

// Route for user sign-in
router.post("/signIn", signIn);

// Route to register multiple users in bulk
router.post("/add-user-in-bulk", registerMultipleUsers);

export default router;
