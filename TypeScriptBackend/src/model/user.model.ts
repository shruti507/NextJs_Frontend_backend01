// src/models/user.model.ts
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define an interface for the User document
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // Unique user email
    password: { type: String, required: true } // User's password
});

// Password Hashing middleware
userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) return next(); // Proceed if password has not been modified
    const salt = await bcrypt.genSalt(10); // Generate salt and hash password
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save the user
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema); // Create 'User' model from schema and export it
export default User;
