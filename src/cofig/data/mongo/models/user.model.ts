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

//* Middleware to intercept save operations and hash the password before storing a new user
userSchema.pre('save', async function (next) {
    if (this.isModified && this.isModified("password")) {             
        this.password = await createHash(this.password);
    }
    next();
});

//* Middleware to intercep findOneAndUpdate operation and hash the passward before storing the changes
userSchema.pre('findOneAndUpdate', async function (next) {
    const update: any = this.getUpdate();

    //* Check for direct password update
    if (update?.password) {
        update.password = await createHash(update.password);
    }
    //* Check for $set.password
    if (update?.$set?.password) {
        update.$set.password = await createHash(update.$set.password);
    }
    next();
});

userSchema.methods.correctPassword = async function(storeHash: string, password: string, ){
    return await checkPassword(storeHash, password);
}

export const  UserModel = mongoose.model("User", userSchema);