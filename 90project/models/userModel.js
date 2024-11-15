import mongoose from "mongoose";
import { type } from "os";

// lets define a schema for the user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide the username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide the password"],
    },
    // Initially we set this to false. But once the user clicks the verify
    // mail while signup, then we change this to True
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// check if the user model exists in mongoose, else create one
const User = mongoose.models.users || mongoose.model("users", userSchema);

// It does not matter if you use "users" or "Users". Interllay mongoose will
// convert them to lowercase. Hence the below code is also correct
// const User = mongoose.models.users || mongoose.models("Users", userSchema);

// export the schema
export default User;
