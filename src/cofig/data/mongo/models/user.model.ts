import { hash } from "crypto";
import mongoose from "mongoose";
const crypto = await import('crypto');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    lastSeen: {type: Date, default: Date.now()}
});

// Middleware to intercept save operations and hash the password before storing
userSchema.pre('save', async function (next) {
    if (this.isModified && this.isModified("password")) {
        
        // Use a strong hash function with a salt for a long hash (e.g., sha512)
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHmac('sha512', salt).update(this.password).digest('hex');
        const hashed = `${salt}:${hash}`;
        this.password = hashed;
    }
    next();
});