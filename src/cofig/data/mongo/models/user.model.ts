// import { createHash, hash } from "crypto";
import mongoose from "mongoose";
import { createHash } from "@/shared/helpers/hashPassword.helper";
import { checkPassword } from "@/shared/helpers/checkPassword.helper";

// To create User Schema in Mongo
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    lastSeen: {type: Date, default: Date.now()}
});

// Middleware to intercept save operations and hash the password before storing
userSchema.pre('save', async function (next) {
    if (this.isModified && this.isModified("password")) {             
        this.password = await createHash(this.password);
    }
    next();
});

userSchema.methods.correctPassword = async function(storeHash: string, password: string, ){
    return await checkPassword(storeHash, password);
}

export const  UserModel = mongoose.model("User", userSchema);